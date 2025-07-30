// // ✅ AuthLayout.style.ts
// 'use client';
// import { styled } from '@mui/material/styles';

// export const Container = styled('div')(({ theme }) => ({
//   display: 'flex',
//   width: '100%',
//   minHeight: '100vh',
//   overflow: 'hidden',

//   [theme.breakpoints.down('sm')]: {
//     display: 'grid',
//     gridTemplateRows: '1fr 1fr', // ⬅️ 上下栏等高
//   },
// }));

// export const FormWrapper = styled('div')(({ theme }) => ({
//   width: '50%',
//   maxWidth: theme.spacing(90), // 720px
//   padding: theme.spacing(17, 11.25, 5, 7.5), // 上右下左：136px 90px 40px 60px
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minWidth: 0,
//   overflow: 'hidden',

//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     maxWidth: 'none',
//     padding: theme.spacing(12.5, 7.5, 5),
//   },

//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     padding: theme.spacing(7.5, 2.5, 3.75),
//     minHeight: 0,
//     overflowY: 'auto', // ✅ 保证内容滚动不被截断
//   },
// }));

// export const BrandingWrapper = styled('div')(({ theme }) => ({
//   width: '50%',
//   maxWidth: theme.spacing(90), // 720px
//   padding: theme.spacing(17, 11.25, 5, 7.5),
//   position: 'relative',
//   backgroundColor: '#f9f9fb',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minWidth: 0,
//   overflow: 'hidden',

//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     maxWidth: 'none',
//     padding: theme.spacing(12.5, 7.5, 5),
//     minHeight: 'auto',
//   },

//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     padding: theme.spacing(7.5, 2.5, 3.75),
//     minHeight: 0,
//     height: 'auto',
//     overflowY: 'auto', // ✅ 同样加滚动支持
//   },
// }));
'use client';

import { styled } from '@mui/material/styles';

// // ✅ AuthLayout.style.ts
// 'use client';
// import { styled } from '@mui/material/styles';

// export const Container = styled('div')(({ theme }) => ({
//   display: 'flex',
//   width: '100%',
//   minHeight: '100vh',
//   overflow: 'hidden',

//   [theme.breakpoints.down('sm')]: {
//     display: 'grid',
//     gridTemplateRows: '1fr 1fr', // ⬅️ 上下栏等高
//   },
// }));

// export const FormWrapper = styled('div')(({ theme }) => ({
//   width: '50%',
//   maxWidth: theme.spacing(90), // 720px
//   padding: theme.spacing(17, 11.25, 5, 7.5), // 上右下左：136px 90px 40px 60px
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minWidth: 0,
//   overflow: 'hidden',

//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     maxWidth: 'none',
//     padding: theme.spacing(12.5, 7.5, 5),
//   },

//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     padding: theme.spacing(7.5, 2.5, 3.75),
//     minHeight: 0,
//     overflowY: 'auto', // ✅ 保证内容滚动不被截断
//   },
// }));

// export const BrandingWrapper = styled('div')(({ theme }) => ({
//   width: '50%',
//   maxWidth: theme.spacing(90), // 720px
//   padding: theme.spacing(17, 11.25, 5, 7.5),
//   position: 'relative',
//   backgroundColor: '#f9f9fb',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minWidth: 0,
//   overflow: 'hidden',

//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     maxWidth: 'none',
//     padding: theme.spacing(12.5, 7.5, 5),
//     minHeight: 'auto',
//   },

//   [theme.breakpoints.down('sm')]: {
//     width: '100%',
//     padding: theme.spacing(7.5, 2.5, 3.75),
//     minHeight: 0,
//     height: 'auto',
//     overflowY: 'auto', // ✅ 同样加滚动支持
//   },
// }));

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
  },
}));

export const FormWrapper = styled('div')(({ theme }) => ({
  width: '50%',
  maxWidth: theme.spacing(90),
  padding: theme.spacing(17, 11.25, 5, 7.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
  overflow: 'hidden',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 'none',
    padding: theme.spacing(12.5, 7.5, 5),
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(7.5, 2.5, 3.75),
    minHeight: 0,
    overflowY: 'auto',
  },
}));

export const BrandingWrapper = styled('div')(({ theme }) => ({
  width: '50%',
  maxWidth: theme.spacing(90),
  padding: theme.spacing(17, 11.25, 5, 7.5),
  position: 'relative',
  backgroundColor: '#f9f9fb',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minWidth: 0,
  overflow: 'hidden',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: 'none',
    padding: theme.spacing(12.5, 7.5, 5),
    minHeight: 'auto',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(7.5, 2.5, 3.75),
    minHeight: 0,
    height: 'auto',
    overflowY: 'auto',
  },
}));
