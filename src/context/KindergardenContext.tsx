import React, { FC, useContext, useState, useEffect } from 'react'

const KindergardenContext = React.createContext({} as any);

export function useKindergarden(){
    return useContext(KindergardenContext);
}

export const KindergardenProvider: FC = ({children}) => {

    const [loading, setLoading] = useState<Boolean>(true);
    const [currentKindergarden, setCurrentKindergarden] = useState<string>();

    function setKindergarden(path: string){
        setCurrentKindergarden(path);
    }
    function getKindergarden(){
        return currentKindergarden;
    }


    useEffect(() => {
        setLoading(false);
    }, [])

    const value = {
        setKindergarden,
        getKindergarden
    }

    return (
        <KindergardenContext.Provider value={value}>
            {!loading && children}
        </KindergardenContext.Provider>
    )
}
