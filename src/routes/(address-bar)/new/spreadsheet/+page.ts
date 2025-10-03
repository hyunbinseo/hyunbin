import { redirect } from '@sveltejs/kit';
import { googleSheetsTemplateUrl } from '../../../(posts)/google-sheets-template';

export const load = () => redirect(307, googleSheetsTemplateUrl);
