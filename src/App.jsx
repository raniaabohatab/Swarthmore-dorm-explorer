import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
    website: 'https://www.swarthmore.edu/campus-life/alice-paul-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: true, dining: 'close', style: 'modern', room: ['single','double','triple'], gym: 'medium'
    }
  },
  { name: 'Dana', img: danaImg, slug: 'dana',
    website: 'https://www.swarthmore.edu/campus-life/dana-hall',
    coed: 'coed (3rd floor women)',
    attributes: {
      environment: 'quiet', ac: false, dining: 'medium', style: 'modern', room: ['single','double'], gym: 'medium'
    }
  },
  { name: 'Danawell', img: danawellImg, slug: 'danawell',
    website: 'https://www.swarthmore.edu/campus-life/danawell',
    coed: 'coed',
    attributes: {
      environment: 'social', ac: true, dining: 'medium', style: 'modern', room: ['double'], gym: 'medium'
    }
  },
  { name: 'David Kemp', img: davidkempImg, slug: 'david-kemp',
    website: 'https://www.swarthmore.edu/campus-life/david-kemp-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: true, dining: 'medium', style: 'modern', room: ['single','double','triple'], gym: 'medium'
    }
  },
  { name: 'Hallowell', img: hallowellImg, slug: 'hallowell',
    website: 'https://www.swarthmore.edu/campus-life/hallowell-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'medium', style: 'modern', room: ['single','double'], gym: 'medium'
    }
  },
  { name: 'Mary Lyon', img: mlImg, slug: 'mary-lyon',
    website: 'https://www.swarthmore.edu/campus-life/mary-lyon-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double','triple'], gym: 'far'
    }
  },
  { name: 'Palmer', img: palmerImg, slug: 'palmer',
    website: 'https://www.swarthmore.edu/campus-life/palmer-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double'], gym: 'far'
    }
  },
  { name: 'Parrish', img: parrishImgDorm, slug: 'parrish',
    website: 'https://www.swarthmore.edu/campus-life/parrish-hall',
    coed: 'mixed',
    attributes: {
      environment: 'quiet', ac: true, dining: 'closest', style: 'historic', room: ['single','double','triple'], gym: 'close'
    }
  },
  { name: 'Pittenger', img: pittingerImg, slug: 'pittenger',
    website: 'https://www.swarthmore.edu/campus-life/pittenger-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double','quint'], gym: 'far'
    }
  },
  { name: 'Roberts', img: robertsImg, slug: 'roberts',
    website: 'https://www.swarthmore.edu/campus-life/roberts-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['single','double','triple'], gym: 'far'
    }
  },
  { name: 'Wharton', img: whartonImg, slug: 'wharton',
    website: 'https://www.swarthmore.edu/campus-life/wharton-hall',
    coed: 'coed',
    attributes: {
      environment: 'social', ac: false, dining: 'close', style: 'historic', room: ['single','double','quad'], gym: 'close'
    }
  },
  { name: 'Willets', img: willetsImg, slug: 'willets',
    website: 'https://www.swarthmore.edu/campus-life/willets-hall',
    coed: 'coed',
    attributes: {
      environment: 'social', ac: false, dining: 'close', style: 'modern', room: ['single','double'], gym: 'close'
    }
  },
  { name: 'Worth', img: worthImg, slug: 'worth',
    website: 'https://www.swarthmore.edu/campus-life/worth-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'medium', style: 'historic', room: ['single','double'], gym: 'medium'
    }
  },
  { name: 'Woolman', img: woolmanImg, slug: 'woolman',
    website: 'https://www.swarthmore.edu/campus-life/woolman-hall',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: true, dining: 'far', style: 'historic', room: ['single','double'], gym: 'far'
    }
  },
  { name: 'The Lodges', img: lodgesImg, slug: 'the-lodges',
    website: 'https://www.swarthmore.edu/campus-life/lodges',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: false, dining: 'far', style: 'historic', room: ['quint'], gym: 'far'
    }
  },
  { name: 'PPR Apartments (includes NPPR)', img: pprImg, slug: 'ppr-apartments',
    website: 'https://www.swarthmore.edu/campus-life/ppr-apartments',
    coed: 'coed',
    attributes: {
      environment: 'quiet', ac: true, dining: 'far', style: 'modern', room: ['apartment'], gym: 'far'
    }
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
  &:hover {
    box-shadow: 0 4px 24px rgba(124,34,34,0.16);
  }
`;
const DormImg = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: var(--light-grey);
`;
const DormName = styled.div`
  font-family: var(--serif);
  font-size: 1.2rem;
  color: var(--garnet);
  font-weight: 600;
  padding: 1rem 0.5rem;
  text-align: center;
`;

function DormsPage() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--cream)', minHeight: '100vh' }}>
      <h2 style={{ fontFamily: 'var(--serif)', color: 'var(--garnet)', fontSize: '2.2rem', marginBottom: '2rem' }}>Explore Dorms</h2>
      <DormGrid>
        {dorms.map((dorm) => (
          <DormCard key={dorm.name} to={`/dorms/${dorm.slug}`}>
            <DormImg src={dorm.img} alt={dorm.name} />
            <DormName>{dorm.name}</DormName>
          </DormCard>
        ))}
      </DormGrid>
    </div>
  );
}

function DormDetailPage() {
  const { slug } = useParams();
  const dorm = dorms.find((d) => d.slug === slug);
  if (!dorm) return <div style={{ padding: '4rem', textAlign: 'center' }}>Dorm not found.</div>;
  
  const distances = walkingDistances[slug] || {};
  const sortedDistances = Object.entries(distances).sort(([,a], [,b]) => a - b);
  
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Banner with dorm image */}
      <div style={{ width: '100%', maxHeight: 320, overflow: 'hidden', position: 'relative', marginBottom: 32 }}>
        <img src={dorm.img} alt={dorm.name} style={{ width: '100%', objectFit: 'cover', height: 240, filter: 'brightness(0.92)', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, boxShadow: '0 2px 12px rgba(124,34,34,0.08)' }} />
        <h2 style={{ position: 'absolute', left: 0, right: 0, bottom: 16, color: '#fff', fontFamily: 'var(--serif)', fontSize: '2.2rem', textShadow: '0 2px 8px rgba(35,35,35,0.18)', margin: 0 }}>{dorm.name}</h2>
      </div>
      
      {/* Button to Swarthmore website */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <a href={dorm.website} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--garnet)', color: '#fff', fontWeight: 700, fontSize: '1.1em', border: 'none', borderRadius: 8, padding: '0.8em 2em', textDecoration: 'none', boxShadow: '0 2px 12px rgba(124,34,34,0.08)', display: 'inline-block', marginTop: 8 }}>
          Learn more on Swarthmore's website
        </a>
      </div>
      
      {/* Walking Distances Section */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem 4rem 2rem' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(124,34,34,0.08)', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--garnet)', fontFamily: 'var(--serif)', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            🚶‍♀️ Walking Distances to Campus Locations
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {sortedDistances.map(([location, time]) => (
              <div key={location} style={{ 
                background: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: 8, 
                border: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600, color: '#495057' }}>{location}</span>
                <span style={{ 
                  background: time <= 3 ? '#d4edda' : time <= 6 ? '#fff3cd' : '#f8d7da',
                  color: time <= 3 ? '#155724' : time <= 6 ? '#856404' : '#721c24',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 20,
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  {time} min
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6c757d', fontSize: '0.9rem' }}>
            <p>💡 <strong>Quick tip:</strong> Green = Very close (≤3 min), Yellow = Moderate (4-6 min), Red = Further away (≥7 min)</p>
          </div>
        </div>
        
        {/* Dorm Attributes Section */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(124,34,34,0.08)', padding: '2rem' }}>
          <h3 style={{ color: 'var(--garnet)', fontFamily: 'var(--serif)', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            🏠 Dorm Features
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌡️</div>
              <div style={{ fontWeight: 600, color: '#495057' }}>Air Conditioning</div>
              <div style={{ color: dorm.attributes.ac ? '#28a745' : '#dc3545', fontWeight: 600 }}>
                {dorm.attributes.ac ? 'Yes' : 'No'}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏢</div>
              <div style={{ fontWeight: 600, color: '#495057' }}>Building Style</div>
              <div style={{ color: '#6c757d', textTransform: 'capitalize' }}>
                {dorm.attributes.style}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontWeight: 600, color: '#495057' }}>Environment</div>
              <div style={{ color: '#6c757d', textTransform: 'capitalize' }}>
                {dorm.attributes.environment}
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🍽️</div>
              <div style={{ fontWeight: 600, color: '#495057' }}>Dining Proximity</div>
              <div style={{ color: '#6c757d', textTransform: 'capitalize' }}>
                {dorm.attributes.dining}
              </div>
            </div>
          </div>
        </div>
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
  return (
    <Hero>
      <Nav>
        <Logo>Swarthmore Dorm Explorer</Logo>
      </Nav>
      <HeroOverlay>
        <HeroTitle> Welcome to Swarthmore Dorm Explorer</HeroTitle>
        <HeroSubtitle>Your guide to every dorm at Swarthmore — floor plans, photos, vibes, and 360° tours.</HeroSubtitle>
        <HeroButton as="button" onClick={() => navigate('/dorms')}>Explore Dorms</HeroButton>
        <QuizButton as="button" onClick={() => navigate('/quiz')}>Find My Dorm</QuizButton>
        <QuizExplanation>Find what dorm fits you best based on your preferences.</QuizExplanation>
      </HeroOverlay>
    </Hero>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dorms" element={<DormsPage />} />
        <Route path="/dorms/:slug" element={<DormDetailPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
