import React from 'react';
import { useAuth } from '../AuthContext';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 4rem 2rem;
  background: var(--cream);
  min-height: 100vh;
`;

const ProfileCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(124, 34, 34, 0.1);
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--garnet);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 1rem;
`;

const Username = styled.h2`
  font-family: var(--serif);
  color: var(--garnet);
  margin: 0;
`;

const Email = styled.p`
  color: #666;
  margin: 0.5rem 0;
`;

const MemberSince = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: var(--cream);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--garnet);
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ReviewsSection = styled.div`
  margin-top: 2rem;
`;

const ReviewCard = styled.div`
  background: var(--cream);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid var(--garnet);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DormName = styled.span`
  font-weight: bold;
  color: var(--garnet);
`;

const ReviewDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ReviewRating = styled.div`
  color: #f39c12;
  margin-bottom: 0.5rem;
`;

const ReviewText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

function UserProfile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <p>Please log in to view your profile.</p>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  const { profile } = currentUser;
  const username = profile?.username || currentUser.displayName || 'User';
  const email = currentUser.email;
  const memberSince = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown';

  // Get user's reviews from localStorage (for now)
  const getUserReviews = () => {
    const reviews = [];
    const dorms = ['alice-paul', 'dana', 'danawell', 'david-kemp', 'hallowell', 'mary-lyon', 'palmer', 'parrish', 'pittenger', 'roberts', 'wharton', 'willets', 'worth', 'woolman', 'the-lodges', 'ppr-apartments'];
    
    dorms.forEach(dormSlug => {
      const dormReviews = JSON.parse(localStorage.getItem(`reviews-${dormSlug}`) || '[]');
      const userReviews = dormReviews.filter(review => review.name === username);
      userReviews.forEach(review => {
        reviews.push({
          ...review,
          dormSlug,
          dormName: getDormName(dormSlug)
        });
      });
    });
    
    return reviews;
  };

  const getDormName = (slug) => {
    const dormNames = {
      'alice-paul': 'Alice Paul',
      'dana': 'Dana',
      'danawell': 'Danawell',
      'david-kemp': 'David Kemp',
      'hallowell': 'Hallowell',
      'mary-lyon': 'Mary Lyon',
      'palmer': 'Palmer',
      'parrish': 'Parrish',
      'pittenger': 'Pittenger',
      'roberts': 'Roberts',
      'wharton': 'Wharton',
      'willets': 'Willets',
      'worth': 'Worth',
      'woolman': 'Woolman',
      'the-lodges': 'The Lodges',
      'ppr-apartments': 'PPR Apartments'
    };
    return dormNames[slug] || slug;
  };

  const userReviews = getUserReviews();
  const totalReviews = userReviews.length;
  const totalComments = userReviews.reduce((sum, review) => sum + (review.comments?.length || 0), 0);

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
          <Username>{username}</Username>
          <Email>{email}</Email>
          <MemberSince>Member since {memberSince}</MemberSince>
        </ProfileHeader>

        <StatsGrid>
          <StatCard>
            <StatNumber>{totalReviews}</StatNumber>
            <StatLabel>Reviews</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{totalComments}</StatNumber>
            <StatLabel>Comments</StatLabel>
          </StatCard>
        </StatsGrid>

        <ReviewsSection>
          <h3 style={{ color: 'var(--garnet)', marginBottom: '1rem' }}>Your Reviews</h3>
          {userReviews.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>You haven't written any reviews yet.</p>
          ) : (
            userReviews.map((review, index) => (
              <ReviewCard key={`${review.dormSlug}-${index}`}>
                <ReviewHeader>
                  <DormName>{review.dormName}</DormName>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewHeader>
                <ReviewRating>{'★'.repeat(review.rating)}</ReviewRating>
                <ReviewText>{review.comment}</ReviewText>
              </ReviewCard>
            ))
          )}
        </ReviewsSection>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default UserProfile; 