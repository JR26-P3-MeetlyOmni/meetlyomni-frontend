// // ✅ Branding.style.ts
// 'use client';
// import { styled } from '@mui/material/styles';

// export const Wrapper = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   textAlign: 'center',
//   width: '100%',
//   height: 'auto',
//   minWidth: 0,
//   overflow: 'hidden',
//   paddingBottom: theme.spacing(5),
// }));

// export const Illustration = styled('img')(({ theme }) => ({
//   display: 'block',
//   width: '100%',
//   maxWidth: theme.spacing(46), // 368px
//   height: 'auto',
//   marginBottom: theme.spacing(5.5),

//   [theme.breakpoints.down('md')]: {
//     marginBottom: theme.spacing(4.5),
//     maxWidth: theme.spacing(40),
//   },
//   [theme.breakpoints.down('sm')]: {
//     marginBottom: theme.spacing(3.75),
//     maxWidth: theme.spacing(35),
//   },
// }));

// // export const ContentWrapper = styled('div')(({ theme }) => ({
// //   width: '100%',
// //   maxWidth: theme.spacing(69.25), // 554px
// //   padding: 0,
// //   overflowWrap: 'break-word',
// //   wordBreak: 'break-word',
// //   minWidth: 0,
// //   flexShrink: 1,
// //   whiteSpace: 'normal',

// //   [theme.breakpoints.down('md')]: {
// //     padding: theme.spacing(0, 2.5),
// //   },
// //   [theme.breakpoints.down('sm')]: {
// //     padding: theme.spacing(0, 2),
// //   },
// // }));

// // export const Heading = styled('h2')(({ theme }) => ({
// //   ...theme.typography.h3,
// //   fontWeight: 900,
// //   lineHeight: 1.2,
// //   color: '#2d2e4c',
// //   marginBottom: theme.spacing(3),
// //   whiteSpace: 'nowrap',
// //   wordBreak: 'break-word',
// //   overflowWrap: 'break-word',

// //   [theme.breakpoints.down(1155)]: {
// //     fontSize: theme.typography.h4.fontSize,
// //   },
// //   [theme.breakpoints.down('sm')]: {
// //     fontSize: theme.typography.h5.fontSize,
// //   },
// // }));
// export const ContentWrapper = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: theme.spacing(75), // ✅ 提高 maxWidth：600px
//   padding: 0,
//   minWidth: 0,
//   flexShrink: 1,
//   overflowWrap: 'break-word',
//   wordBreak: 'break-word',

//   [theme.breakpoints.down('md')]: {
//     padding: theme.spacing(0, 2.5),
//   },
//   [theme.breakpoints.down('sm')]: {
//     padding: theme.spacing(0, 2),
//   },
// }));

// export const Heading = styled('h2')(({ theme }) => ({
//   ...theme.typography.h3,                         // 默认 48px
//   fontWeight: theme.typography.fontWeightBold,
//   lineHeight: 1.2,
//   color: theme.palette.text.primary,
//   marginBottom: theme.spacing(3),

//   whiteSpace: 'normal',       // ✅ 始终允许换行
//   wordBreak: 'keep-all',      // ✅ 不断英文单词
//   overflowWrap: 'break-word', // ✅ 防止超出容器

//   [theme.breakpoints.down('md')]: {
//     fontSize: theme.typography.h4.fontSize, // Tablet 减小字体
//   },
// }));

// export const Highlight = styled('span')(() => ({
//   color: 'inherit',
// }));

// const descriptionBase = ({ theme }: any) => ({
//   ...theme.typography.body1,
//   fontFamily: theme.typography.fontFamily,
//   lineHeight: 1.6,
//   color: theme.palette.text.secondary,
//   marginBottom: theme.spacing(2),

//   [theme.breakpoints.down('md')]: {
//     fontSize: theme.typography.body1.fontSize,
//   },
//   [theme.breakpoints.down('sm')]: {
//     fontSize: '0.9375rem', // 约 15px
//   },
// });

// export const DescriptionLine1 = styled('p')(descriptionBase);
// export const DescriptionLine2 = styled('p')(descriptionBase);

// export const DescriptionLine3 = styled('p')(({ theme }) => ({
//   ...descriptionBase({ theme }),
//   marginBottom: 0,
//   whiteSpace: 'normal',
//   [theme.breakpoints.down('md')]: {
//     whiteSpace: 'normal',
//   },
// }));

// export const DecorationImage = styled('img')(({ theme }) => ({
//   position: 'absolute',
//   width: theme.spacing(13.25), // 106px
//   height: theme.spacing(8.75), // 70px
//   left: theme.spacing(7.5),
//   bottom: theme.spacing(5),
//   objectFit: 'contain',
//   opacity: 1,
//   pointerEvents: 'none',
//   userSelect: 'none',

//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   },
// }));
'use client';

import { styled, Theme } from '@mui/material/styles';

// // ✅ Branding.style.ts
// 'use client';
// import { styled } from '@mui/material/styles';

// export const Wrapper = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   textAlign: 'center',
//   width: '100%',
//   height: 'auto',
//   minWidth: 0,
//   overflow: 'hidden',
//   paddingBottom: theme.spacing(5),
// }));

// export const Illustration = styled('img')(({ theme }) => ({
//   display: 'block',
//   width: '100%',
//   maxWidth: theme.spacing(46), // 368px
//   height: 'auto',
//   marginBottom: theme.spacing(5.5),

//   [theme.breakpoints.down('md')]: {
//     marginBottom: theme.spacing(4.5),
//     maxWidth: theme.spacing(40),
//   },
//   [theme.breakpoints.down('sm')]: {
//     marginBottom: theme.spacing(3.75),
//     maxWidth: theme.spacing(35),
//   },
// }));

// // export const ContentWrapper = styled('div')(({ theme }) => ({
// //   width: '100%',
// //   maxWidth: theme.spacing(69.25), // 554px
// //   padding: 0,
// //   overflowWrap: 'break-word',
// //   wordBreak: 'break-word',
// //   minWidth: 0,
// //   flexShrink: 1,
// //   whiteSpace: 'normal',

// //   [theme.breakpoints.down('md')]: {
// //     padding: theme.spacing(0, 2.5),
// //   },
// //   [theme.breakpoints.down('sm')]: {
// //     padding: theme.spacing(0, 2),
// //   },
// // }));

// // export const Heading = styled('h2')(({ theme }) => ({
// //   ...theme.typography.h3,
// //   fontWeight: 900,
// //   lineHeight: 1.2,
// //   color: '#2d2e4c',
// //   marginBottom: theme.spacing(3),
// //   whiteSpace: 'nowrap',
// //   wordBreak: 'break-word',
// //   overflowWrap: 'break-word',

// //   [theme.breakpoints.down(1155)]: {
// //     fontSize: theme.typography.h4.fontSize,
// //   },
// //   [theme.breakpoints.down('sm')]: {
// //     fontSize: theme.typography.h5.fontSize,
// //   },
// // }));
// export const ContentWrapper = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: theme.spacing(75), // ✅ 提高 maxWidth：600px
//   padding: 0,
//   minWidth: 0,
//   flexShrink: 1,
//   overflowWrap: 'break-word',
//   wordBreak: 'break-word',

//   [theme.breakpoints.down('md')]: {
//     padding: theme.spacing(0, 2.5),
//   },
//   [theme.breakpoints.down('sm')]: {
//     padding: theme.spacing(0, 2),
//   },
// }));

// export const Heading = styled('h2')(({ theme }) => ({
//   ...theme.typography.h3,                         // 默认 48px
//   fontWeight: theme.typography.fontWeightBold,
//   lineHeight: 1.2,
//   color: theme.palette.text.primary,
//   marginBottom: theme.spacing(3),

//   whiteSpace: 'normal',       // ✅ 始终允许换行
//   wordBreak: 'keep-all',      // ✅ 不断英文单词
//   overflowWrap: 'break-word', // ✅ 防止超出容器

//   [theme.breakpoints.down('md')]: {
//     fontSize: theme.typography.h4.fontSize, // Tablet 减小字体
//   },
// }));

// export const Highlight = styled('span')(() => ({
//   color: 'inherit',
// }));

// const descriptionBase = ({ theme }: any) => ({
//   ...theme.typography.body1,
//   fontFamily: theme.typography.fontFamily,
//   lineHeight: 1.6,
//   color: theme.palette.text.secondary,
//   marginBottom: theme.spacing(2),

//   [theme.breakpoints.down('md')]: {
//     fontSize: theme.typography.body1.fontSize,
//   },
//   [theme.breakpoints.down('sm')]: {
//     fontSize: '0.9375rem', // 约 15px
//   },
// });

// export const DescriptionLine1 = styled('p')(descriptionBase);
// export const DescriptionLine2 = styled('p')(descriptionBase);

// export const DescriptionLine3 = styled('p')(({ theme }) => ({
//   ...descriptionBase({ theme }),
//   marginBottom: 0,
//   whiteSpace: 'normal',
//   [theme.breakpoints.down('md')]: {
//     whiteSpace: 'normal',
//   },
// }));

// export const DecorationImage = styled('img')(({ theme }) => ({
//   position: 'absolute',
//   width: theme.spacing(13.25), // 106px
//   height: theme.spacing(8.75), // 70px
//   left: theme.spacing(7.5),
//   bottom: theme.spacing(5),
//   objectFit: 'contain',
//   opacity: 1,
//   pointerEvents: 'none',
//   userSelect: 'none',

//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   },
// }));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  height: 'auto',
  minWidth: 0,
  overflow: 'hidden',
  paddingBottom: theme.spacing(5),
}));

export const Illustration = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  maxWidth: theme.spacing(46),
  height: 'auto',
  marginBottom: theme.spacing(5.5),

  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4.5),
    maxWidth: theme.spacing(40),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3.75),
    maxWidth: theme.spacing(35),
  },
}));

export const ContentWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(75),
  padding: 0,
  minWidth: 0,
  flexShrink: 1,
  overflowWrap: 'break-word',
  wordBreak: 'break-word',

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

export const Heading = styled('h2')(({ theme }) => ({
  ...theme.typography.h3,
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: 1.2,
  color: '#2d2e4c',
  marginBottom: theme.spacing(3),
  whiteSpace: 'normal',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

export const Highlight = styled('span')(() => ({
  color: 'inherit',
}));

const descriptionBase = ({ theme }: { theme: Theme }) => ({
  ...theme.typography.body1,
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.6,
  color: '#475567',
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    fontSize: theme.typography.body1.fontSize,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9375rem',
  },
});

export const DescriptionLine1 = styled('p')(descriptionBase);
export const DescriptionLine2 = styled('p')(descriptionBase);

export const DescriptionLine3 = styled('p')(({ theme }) => ({
  ...descriptionBase({ theme }),
  marginBottom: 0,
  whiteSpace: 'normal',
}));

export const DecorationImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  width: theme.spacing(13.25),
  height: theme.spacing(8.75),
  left: theme.spacing(7.5),
  bottom: theme.spacing(5),
  objectFit: 'contain',
  opacity: 1,
  pointerEvents: 'none',
  userSelect: 'none',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
