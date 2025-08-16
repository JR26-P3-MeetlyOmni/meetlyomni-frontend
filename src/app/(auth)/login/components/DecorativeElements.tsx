import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const AbsoluteBox = styled(Box)({
  position: 'absolute',
});

const LogoWrapper = styled(AbsoluteBox)(({ theme }) => ({
  top: theme.spacing(5),
  left: theme.spacing(5),
  zIndex: 10,
  display: 'none',
  [theme.breakpoints.up('sm')]: { display: 'block' },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(7.5),
    left: theme.spacing(10),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(4.375),
    left: theme.spacing(10),
  },
}));

const TopCenterSketch = styled(AbsoluteBox)(({ theme }) => ({
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  width: 300,
  height: 180,
  backgroundColor: 'rgba(200, 200, 200, 0.3)',
  borderRadius: theme.shape.borderRadius,
  opacity: 0.6,
}));

const MagnifierWrapper = styled(AbsoluteBox)(({ theme }) => ({
  zIndex: 1,
  display: 'block',
  top: '10%',
  left: '5%',
  [theme.breakpoints.up('sm')]: {
    top: '15%',
    left: '8%',
  },
  [theme.breakpoints.up('md')]: {
    top: '20%',
    left: '10%',
  },
  [theme.breakpoints.up('lg')]: {
    top: 300,
    left: 178,
  },
  opacity: 0.7,
}));

const RachelWrapper = styled(AbsoluteBox)(({ theme }) => ({
  zIndex: 2,
  display: 'block',
  top: '20%',
  right: '15%',
  [theme.breakpoints.up('sm')]: {
    top: '22%',
    right: '18%',
  },
  [theme.breakpoints.up('md')]: {
    top: '24%',
    right: '20%',
  },
  [theme.breakpoints.up('lg')]: {
    top: '15%',
    right: 'calc(25% - 100px)',
  },
}));

const MarkWrapper = styled(AbsoluteBox)(({ theme }) => ({
  zIndex: 2,
  display: 'block',
  top: '60%',
  left: '5%',
  [theme.breakpoints.up('sm')]: {
    top: '65%',
    left: '8%',
  },
  [theme.breakpoints.up('md')]: {
    top: '70%',
    left: '12%',
  },
  [theme.breakpoints.up('lg')]: {
    top: 600,
    left: 178,
  },
}));

const LookingForWrapper = styled(AbsoluteBox)(({ theme }) => ({
  zIndex: 1,
  display: 'block',
  top: '45%',
  right: '15%',
  [theme.breakpoints.up('sm')]: {
    top: '50%',
    right: '20%',
  },
  [theme.breakpoints.up('md')]: {
    top: '55%',
    right: '25%',
  },
  [theme.breakpoints.up('lg')]: {
    top: '45%',
    right: '15%',
  },
  opacity: 0.8,
}));

const FormWrapper = styled(AbsoluteBox)(() => ({
  zIndex: 1,
  display: 'block',
  top: 70,
  left: '50%',
  transform: 'translateX(-50%)',
  opacity: 0.8,
}));

const StarWrapper = styled(AbsoluteBox)(({ theme }) => ({
  zIndex: 1,
  display: 'block',
  bottom: '10%',
  right: '5%',
  [theme.breakpoints.up('sm')]: {
    bottom: '8%',
    right: '8%',
  },
  [theme.breakpoints.up('md')]: {
    bottom: '5%',
    right: '12%',
  },
  [theme.breakpoints.up('lg')]: {
    bottom: '15%',
    right: '25%',
  },
  opacity: 0.8,
}));

export const DecorativeElements = () => (
  <>
    <LogoWrapper>
      <Image src="/assets/images/LogIn/logo.png" alt="Omni Logo" width={105} height={30} />
    </LogoWrapper>

    <TopCenterSketch />

    <MagnifierWrapper>
      <Image src="/assets/images/LogIn/glass.png" alt="Magnifying glass" width={84} height={84} />
    </MagnifierWrapper>

    <RachelWrapper>
      <Image src="/assets/images/LogIn/rachel.png" alt="Rachel" width={209.3} height={97.2} />
    </RachelWrapper>

    <MarkWrapper>
      <Image src="/assets/images/LogIn/mark.png" alt="Mark" width={209.3} height={97.2} />
    </MarkWrapper>

    <LookingForWrapper>
      <Image src="/assets/images/LogIn/lookingFor.png" alt="Looking For" width={179} height={42} />
    </LookingForWrapper>

    <FormWrapper>
      <Image src="/assets/images/LogIn/form.png" alt="Form" width={460} height={337} />
    </FormWrapper>

    <StarWrapper>
      <Image src="/assets/images/LogIn/star.png" alt="Star" width={72} height={72} />
    </StarWrapper>
  </>
);
