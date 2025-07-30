// import { StaticImageData } from 'next/image';
// import React from 'react';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import ProductFeatureCard from '../FeatureCard/ProductFeatureCard';
// import ProjectFeatureCard from '../FeatureCard/ProjectFeatureCard';
// interface FeatureCardData {
//   imageUrl: StaticImageData;
//   title: string;
//   desc: string;
// }
// export interface FeatureCardGridProps {
//   data: FeatureCardData[];
//   type: 'project' | 'product';
// }
// const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ data, type }) => {
//   return (
//     <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: '1400px', mx: 'auto' }}>
//           <Grid container spacing={2} justifyContent="center">
//             {data.map((item, index) => (
//               <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
//                 {type === 'project' ? (
//                   <ProjectFeatureCard
//                     imageUrl={item.imageUrl}
//                     title={item.title}
//                     description={item.desc}
//                   />
//                 ) : (
//                   <ProductFeatureCard
//                     imageUrl={item.imageUrl}
//                     title={item.title}
//                     description={item.desc}
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//   );
// };
// export default FeatureCardGrid;
import { StaticImageData } from 'next/image';
import React from 'react';

import Box from '@mui/material/Box';

import ProductFeatureCard from '../FeatureCard/ProductFeatureCard';
import ProjectFeatureCard from '../FeatureCard/ProjectFeatureCard';

interface FeatureCardData {
  imageUrl: StaticImageData;
  title: string;
  desc: string;
}

export interface FeatureCardGridProps {
  data: FeatureCardData[];
  type: 'project' | 'product';
}

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ data, type }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: '12px', sm: '16px', md: '24px' }, // 响应式 gap
        px: { xs: 1, sm: 2, md: 4 }, // 左右内边距让内容更集中
        maxWidth: '1400px',
        mx: 'auto', // 居中容器
      }}
    >
      {data.map((item, index) =>
        type === 'project' ? (
          <ProjectFeatureCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.desc}
          />
        ) : (
          <ProductFeatureCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.desc}
          />
        ),
      )}
    </Box>
  );
};

export default FeatureCardGrid;
