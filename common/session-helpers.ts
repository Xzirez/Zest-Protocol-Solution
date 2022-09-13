import * as Iron from 'iron-session';
import { cleanDehydratedState } from '@micro-stacks/client';
import { sessionOptions } from './session';

import type { NextPageContext } from 'next';
import type { GetServerSidePropsContext } from 'next/types';

export const getIronSession = async (req: NextPageContext['req'], res: NextPageContext['res']) => {
  const session = await Iron.getIronSession(req as any, res as any, sessionOptions);
  return session;
};

export const getDehydratedStateFromSession = async (ctx: GetServerSidePropsContext) => {
  const { dehydratedState } = await getIronSession(ctx.req, ctx.res);
  return dehydratedState ? cleanDehydratedState(dehydratedState) : null;
};
