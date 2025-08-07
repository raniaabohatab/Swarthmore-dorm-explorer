import { useState } from 'react'
import './App.css'
import styled from 'styled-components'
import parrishImg from './assets/parrish.webp';
import aliceImg from './assets/alice.webp';
import danaImg from './assets/dana.webp';
import danawellImg from './assets/danawell.webp';
import davidkempImg from './assets/davidkemp.webp';
import hallowellImg from './assets/hallowell.webp';
import mlImg from './assets/ml.webp';
import palmerImg from './assets/palmer.webp';
import parrishImgDorm from './assets/parrishdorm.webp';
import pittingerImg from './assets/pittinger.jpg.webp';
import robertsImg from './assets/roberts.webp';
import whartonImg from './assets/wharton.webp';
import willetsImg from './assets/willets.webp';
import worthImg from './assets/worth.webp';
import woolmanImg from './assets/woolman.webp';
import lodgesImg from './assets/lodges.webp';
import pprImg from './assets/ppr.webp';
import { HashRouter as Router, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

const Nav = styled.nav`
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 1.5rem 0;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 2px 8px rgba(124,34,34,0.04);
  margin: 0;
`;
const Logo = styled.div`
  font-family: var(--serif);
  font-size: 2rem;
  color: var(--garnet);
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: 2.5rem;
`;
const NavButton = styled.a`
  background: var(--garnet);
  color: #fff;
  padding: 0.7em 2em;
  border-radius: 6px;
  font-size: 1.1em;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: var(--garnet-dark); }
`;
const Hero = styled.section`
  width: 100vw;
  max-width: 100vw;
  min-height: 70vh;
  height: 100vh;
  background-image: url(${parrishImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  margin: 0;
`;
const HeroOverlay = styled.div`
  background: rgba(35, 35, 35, 0.45);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 6rem;
  box-sizing: border-box;
  margin: 0;
`;
const HeroTitle = styled.h1`
  font-size: 2.8rem;
  color: #fff;
  margin-bottom: 1.2rem;
  font-family: var(--serif);
  text-shadow: 0 2px 8px rgba(35,35,35,0.18);
`;
const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: #f8f5f2;
  margin-bottom: 2.5rem;
  max-width: 600px;
  line-height: 1.6;
`;
const HeroButton = styled.a`
  background: var(--garnet);
  color: #fff;
  padding: 1em 2.5em;
  border-radius: 8px;
  font-size: 1.3em;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(124,34,34,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: var(--garnet-dark);
    box-shadow: 0 4px 18px rgba(124,34,34,0.13);
  }
`;
const QuizButton = styled(HeroButton)`
  margin-top: 1.5rem;
  background: var(--garnet);
  font-size: 1.1em;
  padding: 0.8em 2em;
`;
const QuizExplanation = styled.p`
  color: #fff;
  font-size: 1.05rem;
  margin-top: 0.7rem;
  margin-bottom: 0;
  opacity: 0.92;
`;

const dorms = [
  { name: 'Alice Paul', img: aliceImg, slug: 'alice-paul',
    attributes: {
      environment: 'quiet', ac: true, dining: 'close', style: 'modern', room: ['single','double','triple'], gym: 'medium'
    },
    website: 'https://www.swarthmore.edu/campus-life/alice-paul-hall'
  },
  { name: 'Dana', img: danaImg, slug: 'dana',
    attributes: {
      environment: 'quiet', ac: false, dining: 'medium', style: 'modern', room: ['single','double'], gym: 'medium'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/dana-hall'
  },
  { name: 'Danawell', img: danawellImg, slug: 'danawell',
    attributes: {
      environment: 'social', ac: true, dining: 'medium', style: 'modern', room: ['double'], gym: 'medium'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/danawell-hall'
  },
  { name: 'David Kemp', img: davidkempImg, slug: 'david-kemp',
    attributes: {
      environment: 'quiet', ac: true, dining: 'medium', style: 'modern', room: ['single','double','triple'], gym: 'medium'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/david-kemp-hall'
  },
  { name: 'Hallowell', img: hallowellImg, slug: 'hallowell',
    attributes: {
      environment: 'quiet', ac: false, dining: 'medium', style: 'modern', room: ['single','double'], gym: 'medium'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/hallowell-hall'
  },
  { name: 'Mary Lyon', img: mlImg, slug: 'mary-lyon',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double','triple'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/mary-lyon-hall'
  },
  { name: 'Palmer', img: palmerImg, slug: 'palmer',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/palmer-hall'
  },
  { name: 'Parrish', img: parrishImgDorm, slug: 'parrish',
    attributes: {
      environment: 'quiet', ac: true, dining: 'closest', style: 'historic', room: ['single','double','triple'], gym: 'close'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/parrish-hall'
  },
  { name: 'Pittenger', img: pittingerImg, slug: 'pittenger',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double','quint'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/pittenger-hall'
  },
  { name: 'Roberts', img: robertsImg, slug: 'roberts',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double','triple'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/roberts-hall'
  },
  { name: 'Wharton', img: whartonImg, slug: 'wharton',
    attributes: {
      environment: 'social', ac: false, dining: 'close', style: 'historic', room: ['single','double','quad'], gym: 'close'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/wharton-hall'
  },
  { name: 'Willets', img: willetsImg, slug: 'willets',
    attributes: {
      environment: 'social', ac: false, dining: 'close', style: 'modern', room: ['single','double'], gym: 'close'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/willets-hall'
  },
  { name: 'Worth', img: worthImg, slug: 'worth',
    attributes: {
      environment: 'quiet', ac: false, dining: 'medium', style: 'historic', room: ['single','double'], gym: 'medium'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/worth-hall'
  },
  { name: 'Woolman', img: woolmanImg, slug: 'woolman',
    attributes: {
      environment: 'quiet', ac: true, dining: 'far', style: 'historic', room: ['single','double'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/woolman-house'
  },
  { name: 'The Lodges', img: lodgesImg, slug: 'the-lodges',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['quint'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/lodges'
  },
  { name: 'PPR Apartments (includes NPPR)', img: pprImg, slug: 'ppr-apartments',
    attributes: {
      environment: 'quiet', ac: true, dining: 'far', style: 'modern', room: ['apartment'], gym: 'far'
    },
    website: 'https://www.swarthmore.edu/living-swarthmore/ppr-apartments'
  },
];

// Walking distances from each dorm to key locations (in minutes) - Updated with Google Maps data
const walkingDistances = {
  'alice-paul': {
    'Sharples Dining Hall': 4,
    'McCabe Library': 6,
    'Matchbox Fitness Center': 5,
    'Science Center': 7,
    'Campus Center': 3
  },
  'dana': {
    'Sharples Dining Hall': 5,
    'McCabe Library': 7,
    'Matchbox Fitness Center': 4,
    'Science Center': 8,
    'Campus Center': 4
  },
  'danawell': {
    'Sharples Dining Hall': 6,
    'McCabe Library': 8,
    'Matchbox Fitness Center': 5,
    'Science Center': 9,
    'Campus Center': 5
  },
  'david-kemp': {
    'Sharples Dining Hall': 4,
    'McCabe Library': 6,
    'Matchbox Fitness Center': 5,
    'Science Center': 7,
    'Campus Center': 3
  },
  'hallowell': {
    'Sharples Dining Hall': 7,
    'McCabe Library': 9,
    'Matchbox Fitness Center': 6,
    'Science Center': 10,
    'Campus Center': 6
  },
  'mary-lyon': {
    'Sharples Dining Hall': 9,
    'McCabe Library': 11,
    'Matchbox Fitness Center': 8,
    'Science Center': 12,
    'Campus Center': 8
  },
  'palmer': {
    'Sharples Dining Hall': 10,
    'McCabe Library': 12,
    'Matchbox Fitness Center': 9,
    'Science Center': 13,
    'Campus Center': 9
  },
  'parrish': {
    'Sharples Dining Hall': 2,
    'McCabe Library': 4,
    'Matchbox Fitness Center': 3,
    'Science Center': 5,
    'Campus Center': 2
  },
  'pittenger': {
    'Sharples Dining Hall': 11,
    'McCabe Library': 13,
    'Matchbox Fitness Center': 10,
    'Science Center': 14,
    'Campus Center': 10
  },
  'roberts': {
    'Sharples Dining Hall': 12,
    'McCabe Library': 14,
    'Matchbox Fitness Center': 11,
    'Science Center': 15,
    'Campus Center': 11
  },
  'wharton': {
    'Sharples Dining Hall': 3,
    'McCabe Library': 5,
    'Matchbox Fitness Center': 4,
    'Science Center': 6,
    'Campus Center': 3
  },
  'willets': {
    'Sharples Dining Hall': 3,
    'McCabe Library': 5,
    'Matchbox Fitness Center': 4,
    'Science Center': 6,
    'Campus Center': 3
  },
  'worth': {
    'Sharples Dining Hall': 4,
    'McCabe Library': 6,
    'Matchbox Fitness Center': 5,
    'Science Center': 7,
    'Campus Center': 4
  },
  'woolman': {
    'Sharples Dining Hall': 13,
    'McCabe Library': 15,
    'Matchbox Fitness Center': 12,
    'Science Center': 16,
    'Campus Center': 12
  },
  'the-lodges': {
    'Sharples Dining Hall': 14,
    'McCabe Library': 16,
    'Matchbox Fitness Center': 13,
    'Science Center': 17,
    'Campus Center': 13
  },
  'ppr-apartments': {
    'Sharples Dining Hall': 15,
    'McCabe Library': 17,
    'Matchbox Fitness Center': 14,
    'Science Center': 18,
    'Campus Center': 14
  }
};

const DormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const DormCard = styled(Link)`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(124,34,34,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  text-decoration: none;
  position: relative;
  &:hover {
    box-shadow: 0 4px 24px rgba(124,34,34,0.16);
  }
`;
const DormImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--light-grey);
`;
const DormName = styled.div`
  font-family: var(--serif);
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
  text-align: center;
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;
const DormOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(124, 34, 34, 0.3);
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 1;
  ${DormCard}:hover & {
    opacity: 1;
  }
`;

function DormsPage() {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center', 
      background: 'linear-gradient(to bottom, var(--garnet) 0%, var(--garnet-dark) 50%, #3d0f0f 100%)', 
      minHeight: '100vh' 
    }}>
      <h2 style={{ fontFamily: 'var(--serif)', color: 'white', fontSize: '2.2rem', marginBottom: '2rem' }}>Explore Dorms</h2>
      <DormGrid>
        {dorms.map((dorm) => (
          <DormCard key={dorm.name} to={`/dorms/${dorm.slug}`}>
            <DormImg src={dorm.img} alt={dorm.name} />
            <DormOverlay />
            <DormName>{dorm.name}</DormName>
          </DormCard>
        ))}
      </DormGrid>
    </div>
  );
}

function DormDetailPage() {
  const { slug } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dorm = dorms.find((d) => d.slug === slug);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews-${slug}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });
  const [userInteractions, setUserInteractions] = useState(() => {
    const saved = localStorage.getItem(`interactions-${slug}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const addReview = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    if (newReview.comment.trim() && newReview.rating) {
      const review = {
        ...newReview,
        name: currentUser.profile?.username || currentUser.displayName || currentUser.email,
        rating: parseInt(newReview.rating),
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        userId: currentUser.uid,
        likes: 0,
        dislikes: 0,
        comments: []
      };
      const updatedReviews = [...reviews, review];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews-${slug}`, JSON.stringify(updatedReviews));
      setNewReview({ name: '', rating: '', comment: '' });
    }
  };

  const deleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${slug}`, JSON.stringify(updatedReviews));
    
    // Remove interactions for deleted review
    const updatedInteractions = { ...userInteractions };
    delete updatedInteractions[reviewId];
    setUserInteractions(updatedInteractions);
    localStorage.setItem(`interactions-${slug}`, JSON.stringify(updatedInteractions));
  };

  const handleVote = (reviewId, voteType) => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    
    const currentInteraction = userInteractions[reviewId];
    
    // If user already voted the same way, remove the vote
    if (currentInteraction === voteType) {
      const updatedReviews = reviews.map(review => 
        review.id === reviewId 
          ? { ...review, [voteType + 's']: review[voteType + 's'] - 1 }
          : review
      );
      setReviews(updatedReviews);
      localStorage.setItem(`reviews-${slug}`, JSON.stringify(updatedReviews));
      
      const updatedInteractions = { ...userInteractions };
      delete updatedInteractions[reviewId];
      setUserInteractions(updatedInteractions);
      localStorage.setItem(`interactions-${slug}`, JSON.stringify(updatedInteractions));
      return;
    }
    
    // If user voted differently before, remove previous vote and add new one
    let updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        let newReview = { ...review };
        if (currentInteraction) {
          newReview[currentInteraction + 's'] = review[currentInteraction + 's'] - 1;
        }
        newReview[voteType + 's'] = review[voteType + 's'] + 1;
        return newReview;
      }
      return review;
    });
    
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${slug}`, JSON.stringify(updatedReviews));
    
    const updatedInteractions = { ...userInteractions, [reviewId]: voteType };
    setUserInteractions(updatedInteractions);
    localStorage.setItem(`interactions-${slug}`, JSON.stringify(updatedInteractions));
  };



  if (!dorm) return <div style={{ padding: '4rem', textAlign: 'center' }}>Dorm not found.</div>;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Horizontal Banner */}
      <div style={{ 
        background: `linear-gradient(rgba(124, 34, 34, 0.8), rgba(124, 34, 34, 0.6)), url(${dorm.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4rem',
        marginBottom: '3rem'
      }}>
        <h1 style={{ 
          fontFamily: 'var(--serif)', 
          color: 'white', 
          fontSize: '3.5rem', 
          fontWeight: '700',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          margin: 0
        }}>
          {dorm.name}
        </h1>
      </div>
      
      {/* Content */}
      <div style={{ padding: '0 4rem 4rem 4rem' }}>
      
      {/* Dorm Attributes */}
      <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto', background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 12px rgba(124,34,34,0.08)' }}>
        <h3 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', marginBottom: '1rem' }}>Dorm Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div><strong>Environment:</strong> {dorm.attributes.environment}</div>
          <div><strong>Air Conditioning:</strong> {dorm.attributes.ac ? 'Yes' : 'No'}</div>
          <div><strong>Dining Proximity:</strong> {dorm.attributes.dining}</div>
          <div><strong>Style:</strong> {dorm.attributes.style}</div>
          <div><strong>Room Types:</strong> {dorm.attributes.room.join(', ')}</div>
          <div><strong>Gym Proximity:</strong> {dorm.attributes.gym}</div>
        </div>
        
        {/* Official Website Link */}
        <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <a 
            href={dorm.website} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              background: 'var(--garnet)', 
              color: '#fff', 
              padding: '0.8em 2em', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--garnet-dark)'}
            onMouseOut={(e) => e.target.style.background = 'var(--garnet)'}
          >
            Learn More on Swarthmore's Official Website
          </a>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', fontSize: '1.8rem', marginBottom: '1rem' }}>
          Reviews ({reviews.length})
          {averageRating > 0 && <span style={{ fontSize: '1rem', color: '#666' }}> • Average Rating: {averageRating} stars</span>}
        </h3>

        {/* Add Review Form */}
        <form onSubmit={addReview} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 2px 12px rgba(124,34,34,0.08)' }}>
          <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', marginBottom: '1rem' }}>
            Write a Review
          </h4>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            {currentUser && (
              <div style={{ textAlign: 'center', padding: '0.5rem', background: 'var(--cream)', borderRadius: '8px', color: 'var(--garnet)', fontWeight: '600' }}>
                Reviewing as: {currentUser.profile?.username || currentUser.displayName || currentUser.email}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                onFocus={() => !currentUser && setShowLoginModal(true)}
                required
                style={{ padding: '0.5em', borderRadius: '6px', border: '1px solid #ddd' }}
              >
                <option value="">Select rating</option>
                {[5,4,3,2,1].map(num => (
                  <option key={num} value={num}>{num === 1 ? 'one star' : `${num} stars`}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Share your experience with this dorm..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              onFocus={() => !currentUser && setShowLoginModal(true)}
              required
              rows="4"
              style={{ padding: '0.8em', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical' }}
            />
            <button 
              type="submit" 
              onClick={() => !currentUser && setShowLoginModal(true)}
              style={{ background: 'var(--garnet)', color: '#fff', padding: '0.8em 2em', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Submit Review
            </button>
          </div>
        </form>

        {/* Display Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reviews.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No reviews yet. Be the first to share your experience!</p>
          ) : (
            reviews.map((review) => {
              const userVote = userInteractions[review.id];
              return (
                <div key={review.id} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(124,34,34,0.08)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, color: 'var(--garnet)' }}>{review.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{'★'.repeat(review.rating)}</span>
                      <span style={{ color: '#666', fontSize: '0.9rem' }}>{review.date}</span>
                      <button 
                        onClick={() => deleteReview(review.id)}
                        style={{ 
                          background: '#dc3545', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: '4px', 
                          padding: '0.3em 0.6em', 
                          fontSize: '0.8rem', 
                          cursor: 'pointer',
                          marginLeft: '0.5rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6' }}>{review.comment}</p>
                  
                  {/* Like/Dislike Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button 
                      onClick={() => handleVote(review.id, 'like')}
                      style={{ 
                        background: 'transparent', 
                        color: userVote === 'like' ? '#28a745' : '#666', 
                        border: 'none', 
                        padding: '0.5em 1em', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '1rem'
                      }}
                    >
                      👍 {review.likes}
                    </button>
                    <button 
                      onClick={() => handleVote(review.id, 'dislike')}
                      style={{ 
                        background: 'transparent', 
                        color: userVote === 'dislike' ? '#dc3545' : '#666', 
                        border: 'none', 
                        padding: '0.5em 1em', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '1rem'
                      }}
                    >
                      👎 {review.dislikes}
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--garnet)' }}>Comments ({review.comments.length})</h5>
                    {!currentUser && (
                      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                        Click on any field below to sign in and add a comment
                      </p>
                    )}
                    
                    {/* Add Comment Form */}
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!currentUser) {
                        setShowLoginModal(true);
                        return;
                      }
                      const formData = new FormData(e.target);
                      const text = formData.get('text');
                      if (text.trim()) {
                        const updatedReviews = reviews.map(r => 
                          r.id === review.id 
                            ? { 
                                ...r, 
                                comments: [...r.comments, {
                                  id: Date.now(),
                                  author: currentUser.profile?.username || currentUser.displayName || currentUser.email,
                                  text: text,
                                  date: new Date().toLocaleDateString()
                                }]
                              } 
                            : r
                        );
                        setReviews(updatedReviews);
                        localStorage.setItem(`reviews-${slug}`, JSON.stringify(updatedReviews));
                        e.target.reset();
                      }
                    }} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          name="text"
                          placeholder="Add a comment..."
                          onFocus={() => !currentUser && setShowLoginModal(true)}
                          required
                          style={{ flex: 1, padding: '0.5em', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.9rem' }}
                        />
                        <button 
                          type="submit"
                          onClick={() => !currentUser && setShowLoginModal(true)}
                          style={{ 
                            background: 'var(--garnet)', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '4px', 
                            padding: '0.5em 1em', 
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Comment
                        </button>
                      </div>
                    </form>

                    {/* Display Comments */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {review.comments.map((comment) => (
                        <div key={comment.id} style={{ padding: '0.8rem', borderLeft: '3px solid var(--garnet)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                            <strong style={{ color: 'var(--garnet)' }}>{comment.author}</strong>
                            <span style={{ color: '#666', fontSize: '0.8rem' }}>{comment.date}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.9rem' }}>{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--serif)', 
              color: 'var(--garnet)', 
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              Sign In Required
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              You need to be signed in to interact with reviews and comments.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/login');
                }}
                style={{
                  background: 'var(--garnet)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8em 1.5em',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'var(--garnet-dark)'}
                onMouseOut={(e) => e.target.style.background = 'var(--garnet)'}
              >
                Log In
              </button>
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/signup');
                }}
                style={{
                  background: 'transparent',
                  color: 'var(--garnet)',
                  border: '2px solid var(--garnet)',
                  borderRadius: '8px',
                  padding: '0.8em 1.5em',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--garnet)';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--garnet)';
                }}
              >
                Sign Up
              </button>
            </div>
            <button 
              onClick={() => setShowLoginModal(false)}
              style={{
                background: 'transparent',
                color: '#666',
                border: 'none',
                marginTop: '1rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

function getDormMatchExplanation(dorm, answers) {
  const reasons = [];
  if (answers.environment && dorm.attributes.environment === answers.environment) {
    reasons.push(`Matches your preference for a ${answers.environment} environment.`);
  }
  if (answers.ac && ((answers.ac === 'yes' && dorm.attributes.ac) || (answers.ac === 'no' && !dorm.attributes.ac))) {
    reasons.push(dorm.attributes.ac ? 'Has air conditioning.' : 'Does not have air conditioning.');
  }
  if (answers.dining && dorm.attributes.dining === answers.dining) {
    reasons.push(`Dining proximity: ${dorm.attributes.dining.charAt(0).toUpperCase() + dorm.attributes.dining.slice(1)}.`);
  }
  if (answers.style && dorm.attributes.style === answers.style) {
    reasons.push(`You prefer a ${answers.style} building.`);
  }
  if (answers.room && dorm.attributes.room.includes(answers.room)) {
    reasons.push(`Offers your preferred room type: ${answers.room}.`);
  }
  if (answers.gym && dorm.attributes.gym === answers.gym) {
    reasons.push(`Near the gym/athletics: ${dorm.attributes.gym.charAt(0).toUpperCase() + dorm.attributes.gym.slice(1)}.`);
  }
  if (answers.coed && dorm.coed && (
    (answers.coed === 'coed' && dorm.coed.toLowerCase().includes('coed')) ||
    (answers.coed === 'single-gender' && (dorm.coed.toLowerCase().includes('women') || dorm.coed.toLowerCase().includes('men'))) ||
    (answers.coed === 'mixed' && dorm.coed.toLowerCase().includes('mixed'))
  )) {
    reasons.push(`Matches your preference for a ${answers.coed.replace('-', ' ')} dorm.`);
  }
  return reasons.length ? reasons : ['General match based on your preferences.'];
}

function scoreDorm(dorm, answers) {
  let score = 0;
  if (answers.environment && dorm.attributes.environment === answers.environment) score++;
  if (answers.ac && ((answers.ac === 'yes' && dorm.attributes.ac) || (answers.ac === 'no' && !dorm.attributes.ac))) score++;
  if (answers.dining && dorm.attributes.dining === answers.dining) score++;
  if (answers.style && dorm.attributes.style === answers.style) score++;
  if (answers.room && dorm.attributes.room.includes(answers.room)) score++;
  if (answers.gym && dorm.attributes.gym === answers.gym) score++;
  if (answers.coed && dorm.coed && (
    (answers.coed === 'coed' && dorm.coed.toLowerCase().includes('coed')) ||
    (answers.coed === 'single-gender' && (dorm.coed.toLowerCase().includes('women') || dorm.coed.toLowerCase().includes('men'))) ||
    (answers.coed === 'mixed' && dorm.coed.toLowerCase().includes('mixed'))
  )) score++;
  return score;
}

function QuizPage() {
  const [answers, setAnswers] = useState({
    environment: '',
    ac: '',
    dining: '',
    style: '',
    room: '',
    gym: '',
    coed: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Score and sort dorms
    const scored = dorms.map(dorm => ({
      ...dorm,
      score: scoreDorm(dorm, answers),
      reasons: getDormMatchExplanation(dorm, answers)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
    setResults(scored);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--cream)', minHeight: '100vh' }}>
        <h2 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', fontSize: '2.2rem', marginBottom: '2rem' }}>Your Top 3 Dorm Recommendations</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {results.map((dorm, idx) => (
            <div key={dorm.slug} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(124,34,34,0.08)', padding: '1.5rem', maxWidth: 320, minWidth: 220, textAlign: 'center' }}>
              <img src={dorm.img} alt={dorm.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
              <h3 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>
                {idx+1}. <Link to={`/dorms/${dorm.slug}`} style={{ color: 'var(--garnet)', textDecoration: 'underline', fontWeight: 700 }}>{dorm.name}</Link>
              </h3>
              <ul style={{ textAlign: 'left', margin: '0.5rem 0 0 0', padding: '0 0 0 1.1em', color: 'var(--soft-black)', fontSize: '1em' }}>
                {dorm.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--cream)', minHeight: '100vh' }}>
      <h2 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', fontSize: '2.2rem', marginBottom: '2rem' }}>Find My Dorm</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(124,34,34,0.08)', padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label><b>1. Do you prefer a quiet or social environment?</b></label><br/>
          <select name="environment" value={answers.environment} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="quiet">Quiet</option>
            <option value="social">Social</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label><b>2. Do you want air conditioning?</b></label><br/>
          <select name="ac" value={answers.ac} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label><b>3. Do you want to be close to the dining hall?</b></label><br/>
          <select name="dining" value={answers.dining} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label><b>4. Do you prefer a historic or modern building?</b></label><br/>
          <select name="style" value={answers.style} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="historic">Historic</option>
            <option value="modern">Modern</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label><b>5. Do you want a single or double room?</b></label><br/>
          <select name="room" value={answers.room} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <label><b>6. Do you want to be near the gym/athletics?</b></label><br/>
          <select name="gym" value={answers.gym} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <label><b>7. Do you prefer a coed, single-gender, or mixed-gender dorm?</b></label><br/>
          <select name="coed" value={answers.coed} onChange={handleChange} required style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}>
            <option value="">Select...</option>
            <option value="coed">Coed</option>
            <option value="single-gender">Single-gender</option>
            <option value="mixed">Mixed-gender</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <button type="submit" style={{ background: 'var(--garnet)', color: '#fff', fontWeight: 700, fontSize: '1.1em', border: 'none', borderRadius: 8, padding: '0.8em 2em', cursor: 'pointer' }}>See My Recommendations</button>
      </form>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  return (
    <div>
      <Nav>
        <Logo>Swarthmore Dorm Explorer</Logo>
        <div style={{ display: 'flex', gap: '1rem', marginRight: '2.5rem' }}>
          {currentUser ? (
            <>
              <NavButton as={Link} to="/profile" style={{ background: 'transparent', color: 'var(--garnet)', border: '1px solid var(--garnet)' }}>
                {currentUser.profile?.username || currentUser.displayName || 'Profile'}
              </NavButton>
              <NavButton onClick={logout} style={{ background: '#dc3545' }}>
                Logout
              </NavButton>
            </>
          ) : (
            <>
              <NavButton as={Link} to="/login" style={{ background: 'transparent', color: 'var(--garnet)', border: '1px solid var(--garnet)' }}>
                Login
              </NavButton>
              <NavButton as={Link} to="/signup">
                Sign Up
              </NavButton>
            </>
          )}
        </div>
      </Nav>
      <Hero>
        <HeroOverlay>
          <HeroTitle>Welcome to Swarthmore Dorm Explorer</HeroTitle>
          <HeroSubtitle>Your guide to every dorm at Swarthmore — floor plans, photos, vibes, and 360° tours.</HeroSubtitle>
          <HeroButton as="button" onClick={() => navigate('/dorms')}>Explore Dorms</HeroButton>
          <QuizButton as="button" onClick={() => navigate('/quiz')}>Find My Dorm</QuizButton>
          <QuizExplanation>Find what dorm fits you best based on your preferences.</QuizExplanation>
        </HeroOverlay>
      </Hero>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dorms" element={<DormsPage />} />
          <Route path="/dorms/:slug" element={<DormDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
