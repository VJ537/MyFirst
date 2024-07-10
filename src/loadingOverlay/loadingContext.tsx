import React, {createContext, useCallback, useContext, useState} from 'react';
import Loader from "./loader/Loader";

interface LoadingContextType {
    loadingTrigger: () => string;
    loadingRelease: (releaseId: string) => void;
    loadingReleaseAll: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

interface LoadingProviderProps {
    children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
    const [loadingEvents, setLoadingEvents] = useState<string[]>([]);

    const loadingTrigger = useCallback(() => {
        const id = Math.random().toString(36).substring(10);
        setLoadingEvents((prevEvents) => [...prevEvents, id]);
        return id;
    }, [setLoadingEvents]);

    const loadingRelease = useCallback((releaseId: string) => {
        setLoadingEvents((prevEvents) => (
            prevEvents.filter((loadingId) => loadingId !== releaseId)
        ));
    }, [setLoadingEvents]);

    const loadingReleaseAll = useCallback(() => {
        setLoadingEvents([]);
    }, [setLoadingEvents])

    return (
        <LoadingContext.Provider value={{loadingTrigger, loadingRelease, loadingReleaseAll}}>
            {children}
            {loadingEvents.length > 0 && <Loader/>}
        </LoadingContext.Provider>
    );
};