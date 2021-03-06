import React from 'react';
import Footer from '../../../src/components/shared/Footer/Footer';
import { mountWithProviders } from '../utils';

describe('Footer Component tests', () => {
    beforeEach(() => {
        mountWithProviders()(<Footer />);
    });

    it('Contains text and button', () => {
        cy.get('.footer__container').should('exist').contains(/.*/);
    });
});
