export interface RequestData {
    id?: string;
    name: string;
    needs: string;
    message: string;
    phone: string;
    photo?: File | string | null;
    location: { lat: number; lng: number; address?: string } | null;
    status?: string;
    source?: string;
    timestamp?: any;
    recording?: string;
  }
  