'use client';

import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden; // ✅ 彻底阻止子项撑破左右栏

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FormWrapper = styled.div`
  width: 50%;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0; // ✅ 防止内容撑破
  overflow: hidden; // ✅ 额外保险，防滚动

  @media (max-width: 1023px) {
    width: 100%;
    padding: 3rem 1.5rem;
  }

  @media (max-width: 767px) {
    padding: 2rem 1rem;
    height: 50vh;
  }
`;

export const BrandingWrapper = styled.div`
  width: 50%;
  max-width: 720px; // ✅ 关键！即使父容器再大，也不能超过这个宽度
  position: relative;
  background-color: #f9f9fb;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 136px 90px 40px 60px;
  min-height: 900px;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1023px) {
    width: 100%;
    max-width: none;
    padding: 100px 60px 40px;
    min-height: auto;
  }

  @media (max-width: 767px) {
    padding: 60px 20px 30px;
    min-height: auto;
    height: auto;
  }
`;
