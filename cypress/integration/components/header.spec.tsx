import React from 'react';
import Header from '../../../src/components/shared/Header/Header';

import { mountWithProviders } from '../utils';

describe('Header component tests', () => {
    beforeEach(() => {
        mountWithProviders()(<Header  />);
    });

    it('Header appearance', () => {
        cy.get('.header').should('exist').within(() => {
            cy.get('h1').should('contain.text', 'Trending');
        });
    })
});
