import {create} from 'zustand';
import {fetchDataCompany} from "@/api/fetchDataCompany";

interface CompanyState {
    detail: any | null;
    getInfo: (t: any) => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => {
    const getInfo = async (t: any) => {
        const { data } = await fetchDataCompany(t).get();
        set({ detail: data?.data[0] || {} });
    };
    return {
        detail: null,
        getInfo,
    };
});
