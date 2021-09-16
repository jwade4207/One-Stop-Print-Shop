
import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
// import BannerItem from "./BannerItem";
import { Form, DropdownButton, InputGroup, Dropdown, Container, Row, Col, Button, FormControl } from "react-bootstrap";
import { useStoreContext } from '../utils/GlobalState';
import { QUERY_BANNERS } from '../utils/queries';
import { UPDATE_BANNERS } from "../utils/actions";
import { ADD_TO_CART } from '../utils/actions';
import { idbPromise } from '../utils/helpers';


function Banner() {

    const [state, dispatch] = useStoreContext();
    // const { loading, data } = useQuery(QUERY_BANNERS);

    // const {
    //     image,
    //     name,
    //     _id,
    //     price,
    //     quantity
    //   } = item


    const addToCart = () => {
        dispatch({
            type: ADD_TO_CART,
            banner: { purchaseQuantity: 1 }
        });
    };

    // useEffect(() => {
    //     //if there is date to be stored
    //     if (data) {
    //         //store it in GlobalState object
    //         dispatch({
    //             type: UPDATE_BANNERS,
    //             banner: data.banners
    //         });
    //         //also save ea banner to IndexedDB using helper function
    //         data.banners.forEach((banner) => {
    //             idbPromise('banners', 'put', banner);
    //         })
    //         // add else if to check if `loading` is undefined in `useQuery()` Hook
    //     } else if (!loading) {
    //         // if we're offline, get all of the data from the `banners` store
    //         idbPromise('banners', 'get').then((banners) => {
    //             // use retrieved data to set global state for offline browsing
    //             dispatch({
    //                 type: UPDATE_BANNERS,
    //                 banners: banners
    //             });
    //         });
    //     }
    // }, [data, loading, dispatch]);

    return (
        <div>
            <Container fluid>
                <Row id="banner-header">
                    <Col>
                        <h1 className="text-center mt-5">Vinyl Banners</h1>
                        <h3 style={{textAlign: "center"}}>Create Your Banner</h3>
                        <img src=""></img>
                    </Col>
                </Row>
                <Row>
                    <Container>
                        <Form>
                            <Form.Label>Step 1 - Choose size</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl aria-label="Text input with dropdown button" />
                                <DropdownButton
                                    variant="outline-secondary"
                                    title="Dropdown"
                                    id="input-group-dropdown-2"
                                    align="end"
                                >
                                    <Dropdown.Item href="#">Action</Dropdown.Item>
                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                            <Form.Label>Step 2 - Choose Add-ons</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl aria-label="Text input with dropdown button" />
                                <DropdownButton
                                    variant="outline-secondary"
                                    title="Dropdown"
                                    id="input-group-dropdown-2"
                                    align="end"
                                >
                                    <Dropdown.Item href="#">Action</Dropdown.Item>
                                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                            <Form.Label>Step 3 - Choose a Custom Message</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>Custom Message</InputGroup.Text>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>
                            <Form.Label>Upload Custom Design</Form.Label>
                            <Form.Control type="file" />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <div>
                        <Button onClick={addToCart}>Add to cart</Button>
                        </div>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default Banner;
