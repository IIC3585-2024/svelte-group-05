import { tasks } from "../stores/tasks";
import { projects } from "../stores/projects";
import { labels } from "../stores/labels";
import { task_labels } from "../stores/tasksLabels";

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export const load = (async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session)
        }

        const cookie = parse(document.cookie)
        return cookie[key]
      },
    },
  })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    await projects.fetch(session.user.id);
    let _tasks = await tasks.fetch(session.user.id);
    await labels.fetch(session.user.id);
    await task_labels.fetch(_tasks);
  }

  return { supabase, session }
}) satisfies LayoutLoad