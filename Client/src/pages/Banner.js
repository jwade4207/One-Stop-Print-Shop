import { createFactory } from "react";

import React from "react";
import BannerItem from "./BannerItem";
import { Form, DropdownButton, InputGroup } from "react-bootstrap/Form";

function Banner() {
    return (
    <div>
        <Container fluid>
            <Row id="banner-header">
            <Col>
                <h1 class="text-center mt-5">Vinyl Banners</h1>
                <h3 style="text-align: center;">Create Your Banner</h3>
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
            </Container>
            </Row>
        </Container>
    </div>
    );
}

export default Banner;
