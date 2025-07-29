import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
<<<<<<< HEAD
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
=======
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
