import React, { Fragment } from 'react';
import { Form, Button, Image } from "react-bootstrap";
import { iphone, mail } from "../../images/indexImages";

function Contact() {

    const email = "espAcioAbierto.Asturias@gmail.com ";
    const phone = "653039101";

    return (
        <Fragment>
            <div className="contact container-fluid">
                <div className="contact row">
                    <div className="contact col-md-12">
                        <div className="contactFormTitle"><h1 className="title">CONTACTO</h1></div>
                    </div>
                </div>
                <div className="contact row">
                    <div className="contact col-md-12">
                        <div className="contact row">
                            <div className="contact col-md-6">
                                <Form 
                                    id="contactForm" 
                                    action="mailto:espAcioAbierto.Asturias@gmail.com"
                                    method="post"
                                    encType="text/plain"
                                >
                                    <Form.Group controlId="formGroupName">
                                        <Form.Control type="text" placeholder="Nombre" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Control type="email" placeholder="Correo Electrónico" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupTelephone">
                                        <Form.Control type="text" placeholder="Teléfono" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupIssue">
                                        <Form.Control type="text" placeholder="Asunto" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupMessage">
                                        <Form.Control
                                            as="textarea"
                                            rows="6"
                                            placeholder="Escribe aquí tu mensaje..."
                                        />
                                    </Form.Group>
                                    <Button type="submit" variant="outline-success">Enviar</Button>
                                </Form>
                            </div>
                            <div className="contact_us_text col-md-6">
                                <h6 className="contact_us_text">¿TIENES ALGUNA DUDA?</h6>
                                <h4 className="contact_us_text">CONTACTA CON NOSOTROS</h4>
                                <h6 className="contact_us_text">¡Pregúntanos lo que quieras!</h6>
                                <div className="contact_us_list">
                                    <ul className="contact_list">
                                        <li className="contact_list_element row">
                                            <div className="icon_image col-2">
                                                <Image src={iphone} />
                                            </div>
                                            <div className="text_contact col-10">
                                                <p>Llámanos al <span className="boldText"> {phone} </span></p>
                                                <p>De Lunes a Viernes de 10:00 a 18:00 hrs</p>
                                            </div>
                                        </li>
                                        <li className="contact_list_element row">
                                            <div className="icon_image col-2">
                                                <Image src={mail} />
                                            </div>
                                            <div className="text_contact col-10">
                                                <p>Envíanos un e-mail a:</p>
                                                <p><span className="boldText"> {email} </span></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Contact;