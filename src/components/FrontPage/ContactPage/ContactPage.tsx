import {FC} from 'react';


import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';

import {SimpleInformation} from './SimpleInformation';

export const ContactPage: FC = () => {

    return(
        <Wrapper>
            <Contener>
                <SimpleInformation /><br></br>
                <SimpleInformation /><br></br>
            </Contener>
        </Wrapper>
    );

};