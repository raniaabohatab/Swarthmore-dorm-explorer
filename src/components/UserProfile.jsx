import React from 'react';
import { useAuth } from '../AuthContext';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--cream);
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(124, 34, 34, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: var(--serif);
  color: var(--garnet);
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ProfileInfo = styled.div`
  text-align: left;
  margin: 2rem 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--garnet);
`;

const Value = styled.span`
  color: #666;
`;

function UserProfile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <Logo>Swarthmore Dorm Explorer</Logo>
          <p>Please log in to view your profile.</p>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Logo>Swarthmore Dorm Explorer</Logo>
        <h2 style={{ color: 'var(--garnet)', marginBottom: '2rem' }}>User Profile</h2>
        
        <ProfileInfo>
          <InfoRow>
            <Label>Username:</Label>
            <Value>{currentUser.profile?.username || currentUser.displayName || 'Not set'}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Email:</Label>
            <Value>{currentUser.email}</Value>
          </InfoRow>
          <InfoRow>
            <Label>User ID:</Label>
            <Value>{currentUser.uid}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Account Created:</Label>
            <Value>{currentUser.profile?.createdAt ? new Date(currentUser.profile.createdAt).toLocaleDateString() : 'Unknown'}</Value>
          </InfoRow>
        </ProfileInfo>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default UserProfile; 