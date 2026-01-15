import { Request, Response } from 'express';
import { LifeInsuranceRequest, HomeInsuranceRequest, QuoteResponse } from '../types';

export const calculateLifeQuote = (req: Request, res: Response) => {
    const data: LifeInsuranceRequest = req.body;

    // Base Premium based on Plan
    let basePremium = data.plan === 'Premium' ? 2000 : 1000;

    // Age factor
    if (data.age < 30) basePremium += (data.age - 30) * 20;
    if (data.age > 30) basePremium += (data.age - 30) * 50;

    // Beneficiaries factor
    basePremium += data.beneficiaries * 50;

    // Health Status factor
    switch (data.healthStatus) {
        case 'Chronic':
            basePremium *= 1.5;
            break;
        case 'PartialDisability':
            basePremium *= 1.2;
            break;
        case 'TotalDisability':
            basePremium *= 2.0;
            break;
        case 'None':
        default:
            break;
    }

    // Occupation factor (simple example)
    if (['Minero', 'Piloto', 'Bombero'].includes(data.occupation)) {
        basePremium *= 1.3;
    }

    // Features
    if (data.features) {
        for (const feature of data.features) {
            if (feature === 'MuerteAccidental') {
                basePremium += 300;
            } else if (feature === 'EnfermedadGrave') {
                if (data.plan === 'Premium') {
                    basePremium += 500;
                } else {
                    res.status(400).json({
                        error: `Feature '${feature}' is not available in plan '${data.plan}'`,
                        code: 'FEATURE_NOT_IN_PLAN'
                    });
                    return;
                }
            } else {
                res.status(400).json({
                    error: `Feature '${feature}' does not exist`,
                    code: 'FEATURE_NOT_FOUND'
                });
                return;
            }
        }
    }

    const response: QuoteResponse = {
        type: 'Life',
        premium: Math.round(basePremium),
        currency: 'ARS',
        details: data
    };

    res.json(response);
};

export const calculateHomeQuote = (req: Request, res: Response) => {
    const data: HomeInsuranceRequest = req.body;

    // Base Premium based on Plan
    let basePremium = data.plan === 'Premium' ? 1000 : 500;

    // Rooms factor
    basePremium += data.rooms * 100;

    // Dwelling type factor
    if (data.dwellingType === 'House') {
        basePremium *= 1.2;
    }

    // Occupants factor
    basePremium += data.occupants * 20;

    // Location/Province factor (simplified)
    if (['Buenos Aires', 'CABA'].includes(data.province)) {
        basePremium *= 1.1;
    }

    // Features
    if (data.features) {
        for (const feature of data.features) {
            if (feature === 'Incendio') {
                basePremium += 100;
            } else if (['Robo', 'Inundacion'].includes(feature)) {
                if (data.plan === 'Premium') {
                    if (feature === 'Robo') basePremium += 150;
                    if (feature === 'Inundacion') basePremium += 200;
                } else {
                    res.status(400).json({
                        error: `Feature '${feature}' is not available in plan '${data.plan}'`,
                        code: 'FEATURE_NOT_IN_PLAN'
                    });
                    return;
                }
            } else {
                res.status(400).json({
                    error: `Feature '${feature}' does not exist`,
                    code: 'FEATURE_NOT_FOUND'
                });
                return;
            }
        }
    }

    const response: QuoteResponse = {
        type: 'Home',
        premium: Math.round(basePremium),
        currency: 'ARS',
        details: data
    };

    res.json(response);
};
