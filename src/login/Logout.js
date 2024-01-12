import React from 'react';
import { useRecoilState } from 'recoil';
import { LogAtom } from '../component/atoms/LogAtom';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [, setLogAtom] = useRecoilState(LogAtom);
    const navigate = useNavigate();

    

    return (
        <div>
            
        </div>
    );
};

export default Logout;