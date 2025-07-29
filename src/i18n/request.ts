import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
<<<<<<< HEAD
  // Typically corresponds to the `[locale]` segment
=======
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
<<<<<<< HEAD
    messages: (await import(`../../messages/${locale}.json`)).default,
=======
    messages: (await import(`../messages/${locale}.json`)).default,
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
  };
});
