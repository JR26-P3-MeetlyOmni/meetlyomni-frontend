'use client';

import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: auto; // ✅ 避免内部内容裁切
  min-width: 0;
  overflow: hidden;
  padding-bottom: 40px; // ✅ 为最下方内容提供缓冲空间
`;

export const Illustration = styled.img`
  display: block;
  width: 100%;
  max-width: 368px;
  height: auto;
  margin-bottom: 44px;

  @media (max-width: 1023px) {
    margin-bottom: 36px;
    max-width: 320px;
  }

  @media (max-width: 767px) {
    margin-bottom: 30px;
    max-width: 280px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 554px;
  padding: 0;
  overflow-wrap: break-word;
  word-break: break-word;
  min-width: 0;
  flex-shrink: 1; // ✅ 允许压缩，不会死撑
  white-space: normal; // ✅ 默认允许换行

  @media (max-width: 1023px) {
    padding: 0 20px;
  }

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

export const Heading = styled.h2`
  font-size: 2.75rem;
  font-weight: 900;
  line-height: 1.2;
  color: #2d2e4c;
  margin-bottom: 24px;
  white-space: normal; // ✅ 默认就允许换行
  word-break: break-word; // ✅ 自动断词防溢出
  overflow-wrap: break-word;

  @media (max-width: 1155px) {
    font-size: 2.25rem;
  }

  @media (max-width: 767px) {
    font-size: 1.875rem;
  }
`;

export const Highlight = styled.span`
  color: inherit;
`;

const descriptionStyle = `
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.6;
  color: #475567;
  margin-bottom: 16px;

  @media (max-width: 1023px) {
    font-size: 16px;
  }

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

export const DescriptionLine1 = styled.p`
  ${descriptionStyle}
`;
export const DescriptionLine2 = styled.p`
  ${descriptionStyle}
`;
export const DescriptionLine3 = styled.p`
  ${descriptionStyle}
  margin-bottom: 0;
  white-space: nowrap;

  @media (max-width: 1023px) {
    white-space: normal;
  }
`;

export const DecorationImage = styled.img`
  position: absolute;
  width: 106px;
  height: 70px;
  left: 60px;
  bottom: 40px;
  object-fit: contain;
  opacity: 1;
  pointer-events: none;
  user-select: none;

  @media (max-width: 767px) {
    display: none;
  }
`;
