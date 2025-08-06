import Image from 'next/image';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const RachelCard = styled(Box)(() => ({
  position: 'absolute',
  top: 120,
  right: 80,
  zIndex: 8,
}));

const MarkCard = styled(Box)(() => ({
  position: 'absolute',
  bottom: 120,
  left: 80,
  zIndex: 8,
}));

const UserCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '8px 12px',
  borderRadius: 20,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const MarkUserCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '8px 12px',
  borderRadius: 20,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  transform: 'rotate(-5deg)',
}));

const UserAvatar = styled(Box)(() => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid #ffffff',
}));

const UserInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserName = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  color: '#1a1a1a',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: 1.2,
}));

const UserRole = styled(Typography)(() => ({
  fontSize: 12,
  color: '#666666',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: 1.2,
}));

const SearchIcon = styled(Box)(() => ({
  position: 'absolute',
  top: 200,
  left: 100,
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  zIndex: 6,
}));

const SearchBox = styled(Box)(() => ({
  position: 'absolute',
  top: 300,
  right: 120,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '8px 16px',
  borderRadius: 20,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  zIndex: 6,
}));

const SearchText = styled(Typography)(() => ({
  fontSize: 14,
  color: '#666666',
  fontFamily: 'Roboto, sans-serif',
}));

const StarIcon = styled(Box)(() => ({
  position: 'absolute',
  bottom: 80,
  right: 80,
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  zIndex: 8,
}));

export const DecorativeElements: React.FC = () => {
  return (
    <>
      <RachelCard>
        <UserCard>
          <UserAvatar>
            <Image
              src="/assets/images/sign-in/user_avatar.png"
              alt="Rachel"
              width={40}
              height={40}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </UserAvatar>
          <UserInfo>
            <UserName>Rachel</UserName>
            <UserRole>Market Manager</UserRole>
          </UserInfo>
        </UserCard>
      </RachelCard>

      <MarkCard>
        <MarkUserCard>
          <UserAvatar>
            <Image
              src="/assets/images/sign-in/user_avatar.png"
              alt="Mark"
              width={40}
              height={40}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </UserAvatar>
          <UserInfo>
            <UserName>Mark</UserName>
            <UserRole>Operation Expert</UserRole>
          </UserInfo>
        </MarkUserCard>
      </MarkCard>

      <SearchIcon>
        <Image
          src="/assets/images/sign-in/magnifying_glass.png"
          alt="Search"
          width={30}
          height={30}
        />
      </SearchIcon>

      <SearchBox>
        <SearchText>I am looking for</SearchText>
      </SearchBox>

      <StarIcon>
        <Image src="/assets/images/sign-in/star.png" alt="Rating" width={28} height={28} />
      </StarIcon>
    </>
  );
};
