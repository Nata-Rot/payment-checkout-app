import axios from 'axios';
import type { CardData } from '../types';

const WOMPI_BASE = import.meta.env.VITE_WOMPI_BASE_URL ?? 'https://api-sandbox.co.uat.wompi.dev/v1';
const PUBLIC_KEY = import.meta.env.VITE_WOMPI_PUBLIC_KEY ?? 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';

const wompiHttp = axios.create({ baseURL: WOMPI_BASE, timeout: 30000 });

export const wompiService = {
  async tokenizeCard(card: CardData): Promise<string> {
    const { data } = await wompiHttp.post('/tokens/cards',
      { number: card.number.replace(/\s/g, ''), cvc: card.cvc,
        exp_month: card.expMonth, exp_year: card.expYear, card_holder: card.cardHolder },
      { headers: { Authorization: 'Bearer ' + PUBLIC_KEY } });
    return data.data.id as string;
  },
};