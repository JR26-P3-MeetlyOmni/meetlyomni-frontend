import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

<<<<<<< HEAD
// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
=======
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
