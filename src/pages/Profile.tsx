// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { useAuth } from '../hooks/useAuth';
import { updateUser } from '../store/slices/userSlice';
import { 
  User, 
  Mail, 
  Edit, 
  Save, 
  X, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Shield,
  MapPin,
  Bell,
  Star
} from 'lucide-react';

// Styled components using theme props (will work after creating styled.d.ts)
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 1.1rem;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.theme.primary};
`;

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const UserEmail = styled.p`
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: none;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateX(5px);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }

  &:disabled {
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textSecondary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CancelButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.border};
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatCard = styled.div`
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

const RecentActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.background};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
`;

const ActivityIcon = styled.div`
  background: ${props => props.theme.gradient};
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text};
`;

const ActivityTime = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
`;

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    dispatch(updateUser({
      name: formData.name,
      email: formData.email,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: '',
      address: '',
    });
    setIsEditing(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const stats = [
    { value: '12', label: 'Orders', icon: ShoppingBag },
    { value: '8', label: 'Wishlist', icon: Heart },
    { value: '4.8', label: 'Rating', icon: Star },
    { value: '2', label: 'Addresses', icon: MapPin },
  ];

  const activities = [
    { icon: ShoppingBag, title: 'Order placed', time: '2 hours ago', description: 'Quantum Laptop X1' },
    { icon: Heart, title: 'Added to wishlist', time: '1 day ago', description: 'Neural Headset Pro' },
    { icon: Star, title: 'Review submitted', time: '3 days ago', description: 'Solar Jacket' },
    { icon: Shield, title: 'Password updated', time: '1 week ago', description: 'Security settings' },
  ];

  return (
    <Container>
      <ProfileHeader>
        <Title>Profile Settings</Title>
        <Subtitle>Manage your account and preferences</Subtitle>
      </ProfileHeader>

      <ProfileGrid>
        <Sidebar>
          <AvatarSection>
            {user.avatar ? (
              <Avatar src={user.avatar} alt={user.name} />
            ) : (
              <AvatarPlaceholder>
                {getInitials(user.name)}
              </AvatarPlaceholder>
            )}
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserEmail>
                <Mail size={16} />
                {user.email}
              </UserEmail>
            </UserInfo>
          </AvatarSection>

          <NavMenu>
            <NavItem 
              active={activeSection === 'personal'}
              onClick={() => setActiveSection('personal')}
            >
              <User size={18} />
              Personal Info
            </NavItem>
            <NavItem 
              active={activeSection === 'orders'}
              onClick={() => setActiveSection('orders')}
            >
              <ShoppingBag size={18} />
              Orders
            </NavItem>
            <NavItem 
              active={activeSection === 'security'}
              onClick={() => setActiveSection('security')}
            >
              <Shield size={18} />
              Security
            </NavItem>
            <NavItem 
              active={activeSection === 'notifications'}
              onClick={() => setActiveSection('notifications')}
            >
              <Bell size={18} />
              Notifications
            </NavItem>
            <NavItem onClick={handleSignOut}>
              <LogOut size={18} />
              Sign Out
            </NavItem>
          </NavMenu>
        </Sidebar>

        <MainContent>
          {activeSection === 'personal' && (
            <ProfileCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <SectionTitle>
                  <User size={20} />
                  Personal Information
                </SectionTitle>
                {!isEditing ? (
                  <EditButton
                    onClick={() => setIsEditing(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={16} />
                    Edit Profile
                  </EditButton>
                ) : null}
              </div>

              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>

              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  placeholder="123 Future Street, Tech City"
                />
              </FormGroup>

              {isEditing && (
                <ButtonGroup>
                  <SaveButton
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save size={16} />
                    Save Changes
                  </SaveButton>
                  <CancelButton
                    onClick={handleCancel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} />
                    Cancel
                  </CancelButton>
                </ButtonGroup>
              )}

              <StatsGrid>
                {stats.map((stat, index) => (
                  <StatCard key={index}>
                    <stat.icon size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                ))}
              </StatsGrid>
            </ProfileCard>
          )}

          {/* Other sections remain the same... */}
        </MainContent>
      </ProfileGrid>
    </Container>
  );
};