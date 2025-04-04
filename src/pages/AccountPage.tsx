
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/PageLayout';
import { toast } from 'sonner';
import { Loader2, MapPin } from 'lucide-react';
import { supabase, Profile, getTypedProfile } from '@/lib/supabase';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          // Use our utility function to get properly typed profile data
          const profile = getTypedProfile<Profile>(data);
          
          setName(profile.name || '');
          setEmail(user.email || '');
          setMobileNumber(profile.mobile_number || '');
          setStreet(profile.address_street || '');
          setCity(profile.address_city || '');
          setState(profile.address_state || '');
          setPostalCode(profile.address_postal_code || '');
          setCountry(profile.address_country || '');
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Create an update object with our custom type
      const updateData: Partial<Profile> = {
        name,
        mobile_number: mobileNumber,
        address_street: street,
        address_city: city,
        address_state: state,
        address_postal_code: postalCode,
        address_country: country
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p>Please log in to view your account.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Account Management</h2>
          <div className="flex space-x-4">
            <Button variant="outline" asChild>
              <Link to="/orders">
                My Orders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/addresses">
                <MapPin className="mr-2 h-4 w-4" />
                Saved Addresses
              </Link>
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input 
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium text-lg mb-4">Default Address</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This address will be used as your default shipping address. 
                  To manage multiple addresses, go to <Link to="/addresses" className="text-primary hover:underline">Saved Addresses</Link>.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input 
                      id="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Enter your street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter your state/province"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Enter your postal code"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
