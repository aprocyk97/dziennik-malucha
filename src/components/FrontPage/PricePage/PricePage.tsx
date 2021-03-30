import React from 'react';
import {FC} from 'react';
import styled from 'styled-components';

import {Wrapper} from '../../../styledHelpers/Components';
import {Contener} from '../../../styledHelpers/Components';



const Card = styled.div`
    border: 1px solid lightblue;
    background: hsl(8.630136986301375, 62.393162393162385%, 54.11764705882353%);
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 40px;
    padding-left: 40px;
    border-radius: 10px;  
`;

export const PricePage: FC = () => {
    return(
        <Wrapper>
            <Contener>
                <tr >
                    <td>
                        <Card>
                            Pakiet 1
                            <br />
                            Cena: 12/mies
                            <br />
                            Informacje: xxxx
                            <br />
                            xxxxxxxxxxxxxxxx
                            <br />
                            xxxxxxxxxxxxxxxx
                        </Card>
                    </td>
                    <td>
                        <Card>
                            Pakiet 2
                            <br />
                            Cena: 20/mies
                            <br />
                            Informacje: xxxx
                            <br />
                            xxxxxxxxxxxxxxxx
                            <br />
                            xxxxxxxxxxxxxxxx
                        </Card>
                    </td>
                    <td>
                        <Card>
                            Pakiet 3
                            <br />
                            Cena: 30mies
                            <br />
                            Informacje: xxxx
                            <br />
                            xxxxxxxxxxxxxxxx
                            <br />
                            xxxxxxxxxxxxxxxx
                        </Card>
                    </td>
                </tr>
            </Contener>
        </Wrapper>
    );

};