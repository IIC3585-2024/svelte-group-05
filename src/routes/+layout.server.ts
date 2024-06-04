import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals: { safeGetSession }, url }) => {
  const { session, user } = await safeGetSession()

  if (!user && url.pathname.startsWith('/app')) {
    throw redirect(302, '/login');
  } else if (user && url.pathname === '/') {
    throw redirect(302, '/app/tasks');
  } else if (user && (url.pathname === '/login' || user && url.pathname === '/signup')) {
    throw redirect(302, '/app/tasks');
  }

  return {
    session,
    user,
  }
}) satisfies LayoutServerLoad