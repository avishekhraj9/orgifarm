import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/PageLayout';
import { supabase } from '@/integrations/supabase/client';
import { UserAddress, NewUserAddress } from '@/types/address';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const SavedAddressesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<UserAddress | null>(null);
  const [formData, setFormData] = useState<NewUserAddress>({
    address_name: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false,
  });

  useEffect(() => {
    console.log('Current auth user:', user);
  }, [user]);

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['user-addresses', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('No user found, returning empty addresses array');
        return [];
      }
      
      console.log('Fetching addresses for user:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('user_addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false })
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching addresses:', error);
          throw error;
        }
        
        console.log('Fetched addresses:', data);
        return data as UserAddress[];
      } catch (err) {
        console.error('Exception during address fetch:', err);
        throw err;
      }
    },
    enabled: !!user,
  });

  const createAddressMutation = useMutation({
    mutationFn: async (newAddress: NewUserAddress) => {
      if (!user) {
        console.error('Cannot create address: User not authenticated');
        throw new Error('User not authenticated');
      }
      
      console.log('Creating new address for user:', user.id, 'Address data:', newAddress);
      
      if (addresses.length === 0 || newAddress.is_default) {
        newAddress.is_default = true;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_addresses')
          .insert({ ...newAddress, user_id: user.id })
          .select('*')
          .single();
        
        if (error) {
          console.error('Error creating address:', error);
          throw error;
        }
        
        console.log('New address created:', data);
        
        if (newAddress.is_default) {
          await updateOtherAddressesDefaultStatus((data as UserAddress).id);
        }
        
        return data;
      } catch (err) {
        console.error('Exception during address creation:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
      toast.success('Address added successfully');
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error('Mutation error in create address:', error);
      toast.error(`Error adding address: ${error.message}`);
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: async ({ id, address }: { id: string; address: NewUserAddress }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('user_addresses')
        .update(address)
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();
      
      if (error) throw error;
      
      if (address.is_default) {
        await updateOtherAddressesDefaultStatus(id);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
      toast.success('Address updated successfully');
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Error updating address: ${error.message}`);
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error, data } = await supabase
        .from('user_addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select('is_default')
        .single();
      
      if (error) throw error;
      
      if (data.is_default && addresses.length > 1) {
        const remainingAddresses = addresses.filter(addr => addr.id !== id);
        if (remainingAddresses.length > 0) {
          await supabase
            .from('user_addresses')
            .update({ is_default: true })
            .eq('id', remainingAddresses[0].id)
            .eq('user_id', user.id);
        }
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
      toast.success('Address deleted successfully');
      setIsDeleteDialogOpen(false);
      setCurrentAddress(null);
    },
    onError: (error) => {
      toast.error(`Error deleting address: ${error.message}`);
    },
  });

  const setAsDefaultMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_addresses')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      await updateOtherAddressesDefaultStatus(id);
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
      toast.success('Default address updated');
    },
    onError: (error) => {
      toast.error(`Error updating default address: ${error.message}`);
    },
  });

  const updateOtherAddressesDefaultStatus = async (currentAddressId: string) => {
    if (!user) return;
    
    try {
      console.log('Updating other addresses to non-default for address ID:', currentAddressId);
      const { error } = await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .neq('id', currentAddressId);
        
      if (error) {
        console.error('Error updating other addresses default status:', error);
      }
    } catch (err) {
      console.error('Exception updating other addresses:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditAddress = (address: UserAddress) => {
    setCurrentAddress(address);
    setFormData({
      address_name: address.address_name,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteAddress = (address: UserAddress) => {
    setCurrentAddress(address);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      address_name: '',
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      is_default: false,
    });
    setCurrentAddress(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditDialogOpen && currentAddress) {
      updateAddressMutation.mutate({ id: currentAddress.id, address: formData });
    } else {
      createAddressMutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (!user && !isLoading) {
      console.log('No authenticated user, redirecting to login');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleOpenAddDialog = () => {
    resetForm();
    if (addresses.length === 0) {
      setFormData(prev => ({ ...prev, is_default: true }));
    }
    setIsAddDialogOpen(true);
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Saved Addresses</h1>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : addresses.length === 0 ? (
          <Card className="bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <p className="mb-4 text-muted-foreground">You don't have any saved addresses yet.</p>
              <Button onClick={handleOpenAddDialog}>Add your first address</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className={address.is_default ? 'border-primary' : ''}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">{address.address_name}</h3>
                        {address.is_default && (
                          <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-1">{address.street}</p>
                      <p className="text-sm">{address.city}, {address.state} {address.postal_code}</p>
                      <p className="text-sm">{address.country}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditAddress(address)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteAddress(address)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!address.is_default && (
                    <Button
                      variant="ghost" 
                      size="sm" 
                      className="mt-2" 
                      onClick={() => setAsDefaultMutation.mutate(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter the details of your new address below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="address_name">Address Name</Label>
                  <Input
                    id="address_name"
                    name="address_name"
                    placeholder="Home, Work, etc."
                    value={formData.address_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    name="street"
                    placeholder="Street address"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      name="postal_code"
                      placeholder="Postal code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="is_default"
                    name="is_default"
                    className="w-4 h-4"
                    checked={formData.is_default || addresses.length === 0}
                    onChange={handleInputChange}
                    disabled={addresses.length === 0}
                  />
                  <Label htmlFor="is_default" className="text-sm font-normal">
                    {addresses.length === 0 
                      ? "This will be set as your default address" 
                      : "Set as default address"}
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createAddressMutation.isPending}>
                  {createAddressMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Address
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
              <DialogDescription>
                Update your address details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit_address_name">Address Name</Label>
                  <Input
                    id="edit_address_name"
                    name="address_name"
                    placeholder="Home, Work, etc."
                    value={formData.address_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit_street">Street Address</Label>
                  <Input
                    id="edit_street"
                    name="street"
                    placeholder="Street address"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="edit_city">City</Label>
                    <Input
                      id="edit_city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit_state">State</Label>
                    <Input
                      id="edit_state"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="edit_postal_code">Postal Code</Label>
                    <Input
                      id="edit_postal_code"
                      name="postal_code"
                      placeholder="Postal code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit_country">Country</Label>
                    <Input
                      id="edit_country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="edit_is_default"
                    name="is_default"
                    className="w-4 h-4"
                    checked={formData.is_default}
                    onChange={handleInputChange}
                    disabled={currentAddress?.is_default}
                  />
                  <Label htmlFor="edit_is_default" className="text-sm font-normal">
                    {currentAddress?.is_default 
                      ? "This is your default address" 
                      : "Set as default address"}
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateAddressMutation.isPending}>
                  {updateAddressMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Address</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this address? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button" 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => currentAddress && deleteAddressMutation.mutate(currentAddress.id)}
                disabled={deleteAddressMutation.isPending}
              >
                {deleteAddressMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default SavedAddressesPage;
