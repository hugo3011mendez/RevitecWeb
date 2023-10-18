import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../collection/icons/Loading';
// Language
import { LanguageContext } from '../context/LanguageProvider';
import { languageText } from '../utils/functions';

export default function Scoreboard(props) {
    // Language
    const { language } = useContext(LanguageContext);

    const game = props.game;
    const player1 = game.player1;
    const player2 = game.player2;
    const field = game.field;

    return player1 && player2 ? <>
        <Container>
            {game.isKO && game.scorePlayer1Set2 &&
                <Row>
                    <h6 style={{ textAlign: 'center' }}>{languageText("1er Set", "1st Set")}</h6>
                </Row>
            }

            <Row>
                <Col>
                    <h6>{game.scorePlayer1Set2 == null && player1.name}</h6>
                </Col>

                <Col>
                    <h4 style={{ textAlign: 'center' }}>{game.scorePlayer1}</h4>
                </Col>

                <Col>
                    <h4 style={{ textAlign: 'center' }}> - </h4>
                </Col>

                <Col>
                    <h4 style={{ textAlign: 'center' }}>{game.scorePlayer2}</h4>
                </Col>

                <Col>
                    <h6>{game.scorePlayer2Set2 == null && player2.name}</h6>
                </Col>
            </Row>

            {game.isKO && game.scorePlayer1Set2 &&
                <>
                    {/* Set 2 */}
                    <Row>
                    <h6 style={{ textAlign: 'center' }}>{languageText("2o Set", "2nd Set")}</h6>
                    </Row>
                    <Row>
                        <Col>
                            <h6>{player1.name}</h6>
                        </Col>

                        <Col>
                            <h4 style={{ textAlign: 'center' }}>{game.scorePlayer1Set2}</h4>
                        </Col>

                        <Col>
                            <h4 style={{ textAlign: 'center' }}> - </h4>
                        </Col>

                        <Col>
                            <h4 style={{ textAlign: 'center' }}>{game.scorePlayer2Set2}</h4>
                        </Col>

                        <Col>
                            <h6>{player2.name}</h6>
                        </Col>
                    </Row>

                    {/* Set 3 */}
                    <Row>
                    <h6 style={{ textAlign: 'center' }}>{languageText("3er Set", "3rd Set")}</h6>
                    </Row>
                    <Row>
                        <Col></Col>

                        <Col>
                            <h4 style={{ textAlign: 'center' }}>{game.scorePlayer1Set3}</h4>
                        </Col>

                        <Col>
                            <h4 style={{ textAlign: 'center' }}> - </h4>
                        </Col>

                        <Col>
                            <h4 style={{ textAlign: 'center' }}>{game.scorePlayer2Set3}</h4>
                        </Col>

                        <Col></Col>
                    </Row>
                </>
            }

            <Row>
                    <h6 style={{ textAlign: 'center' }}>{language == "es" ? field.name : field.description}</h6>
            </Row>

            {game.hasFinished &&
                <Row>
                    <h4 style={{ textAlign: 'center' }} className='text-danger'>{languageText("FINALIZADO", "FINISHED")}</h4>
                </Row>
            }
        </Container>
    </> : <Loading />;
}
