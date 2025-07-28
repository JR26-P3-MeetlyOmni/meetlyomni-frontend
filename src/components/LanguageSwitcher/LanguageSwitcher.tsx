'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button, ButtonGroup } from '@mui/material';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    // Extract the path without locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  const getCurrentLocale = () => {
    const match = pathname.match(/^\/([a-z]{2})/);
    return match ? match[1] : 'en';
  };

  const currentLocale = getCurrentLocale();

  return (
    <ButtonGroup variant="outlined" size="small" sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      <Button
        onClick={() => handleLanguageChange('en')}
        variant={currentLocale === 'en' ? 'contained' : 'outlined'}
        sx={{ 
          minWidth: 'auto', 
          px: 2,
          backgroundColor: currentLocale === 'en' ? 'primary.main' : 'transparent',
          color: currentLocale === 'en' ? 'white' : 'inherit'
        }}
      >
        EN
      </Button>
      <Button
        onClick={() => handleLanguageChange('zh')}
        variant={currentLocale === 'zh' ? 'contained' : 'outlined'}
        sx={{ 
          minWidth: 'auto', 
          px: 2,
          backgroundColor: currentLocale === 'zh' ? 'primary.main' : 'transparent',
          color: currentLocale === 'zh' ? 'white' : 'inherit'
        }}
      >
        中文
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher; 