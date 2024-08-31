import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Button, Typography, Paper, Box, List, ListItem } from '@mui/material';
import { Container } from '@mui/system';

import { Character } from '../interfaces/Character.types';
import { CultureItem } from '../interfaces/CultureItem.types';
import { EyeColorItem } from '../interfaces/EyeColorItem.types';
import { FearItem } from '../interfaces/FearItem.types';
import { FinancialStatusItem } from '../interfaces/FinancialStatusItem.types';
import { HairColorItem } from '../interfaces/HairColorItem.types';
import { HealthConditionItem } from '../interfaces/HealthConditionItem.types';
import { HeightItem } from '../interfaces/HeightItem.types';
import { MotivationItem } from '../interfaces/MotivationItem.types';
import { PersonalityTraitItem } from '../interfaces/PersonalityTraitItem.types';
import { PostureItem } from '../interfaces/PostureItem.types';
import { SexItem } from '../interfaces/SexyItem.types';
import { SkillItem } from '../interfaces/SkillItem.types';
import { ValueItem } from '../interfaces/ValueItem.types';
import { WeightItem } from '../interfaces/WeightItem.types';

const CharacterGenerator: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [data, setData] = useState<{
    sexes: SexItem[];
    heights: HeightItem[];
    weights: WeightItem[];
    hairColors: HairColorItem[];
    eyeColors: EyeColorItem[];
    personalityTraits: PersonalityTraitItem[];
    skills: SkillItem[];
    postures: PostureItem[];
    healthConditions: HealthConditionItem[];
    values: ValueItem[];
    fears: FearItem[];
    motivations: MotivationItem[];
    financialStatuses: FinancialStatusItem[];
    cultures: CultureItem[];
  }>({
    sexes: [],
    heights: [],
    weights: [],
    hairColors: [],
    eyeColors: [],
    personalityTraits: [],
    skills: [],
    postures: [],
    healthConditions: [],
    values: [],
    fears: [],
    motivations: [],
    financialStatuses: [],
    cultures: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        api.get('/sexes'),
        api.get('/heights'),
        api.get('/weights'),
        api.get('/hairColors'),
        api.get('/eyeColors'),
        api.get('/personalityTraits'),
        api.get('/skills'),
        api.get('/postures'),
        api.get('/healthConditions'),
        api.get('/values'),
        api.get('/fears'),
        api.get('/motivations'),
        api.get('/financialStatuses'),
        api.get('/cultures')
      ]);

      setData({
        sexes: responses[0]?.data || [],
        heights: responses[1]?.data || [],
        weights: responses[2]?.data || [],
        hairColors: responses[3]?.data || [],
        eyeColors: responses[4]?.data || [],
        personalityTraits: responses[5]?.data || [],
        skills: responses[6]?.data || [],
        postures: responses[7]?.data || [],
        healthConditions: responses[8]?.data || [],
        values: responses[9]?.data || [],
        fears: responses[10]?.data || [],
        motivations: responses[11]?.data || [],
        financialStatuses: responses[12]?.data || [],
        cultures: responses[13]?.data || []
      });
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const getRandomItem = <T extends { id: number }>(items: T[]): T | null => {
    return items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;
  };

  const generateRandomCharacter = () => {
    const newCharacter: Character = {
      sex: getRandomItem(data.sexes)?.sex || 'Desconhecido',
      height: getRandomItem(data.heights)?.height || 'Desconhecido',
      weight: getRandomItem(data.weights)?.weight || 'Desconhecido',
      hairColor: getRandomItem(data.hairColors)?.color || 'Desconhecido',
      eyeColor: getRandomItem(data.eyeColors)?.color || 'Desconhecido',
      personalityTraits: [getRandomItem(data.personalityTraits)?.trait || 'Desconhecido'],
      skills: [getRandomItem(data.skills)?.skill || 'Desconhecido'],
      posture: getRandomItem(data.postures)?.posture || 'Desconhecido',
      healthCondition: getRandomItem(data.healthConditions)?.condition || 'Desconhecido',
      values: [getRandomItem(data.values)?.value || 'Desconhecido'],
      fears: [getRandomItem(data.fears)?.fear || 'Desconhecido'],
      motivations: [getRandomItem(data.motivations)?.motivation || 'Desconhecido'],
      financialStatus: getRandomItem(data.financialStatuses)?.status || 'Desconhecido',
      culture: getRandomItem(data.cultures)?.culture || 'Desconhecido'
    };

    setCharacter(newCharacter);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h1" gutterBottom>
          Gerador de Personagens
        </Typography>
        <Button variant="contained" color="primary" onClick={generateRandomCharacter}>
          Gerar Personagem
        </Button>
      </Box>
      {character && (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h2" gutterBottom>
            Personagem Gerado
          </Typography>
          <List>
            <ListItem>
              <Typography variant="body1"><strong>Sexo:</strong> {character.sex}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Altura:</strong> {character.height}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Peso:</strong> {character.weight}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Cor do Cabelo:</strong> {character.hairColor}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Cor dos Olhos:</strong> {character.eyeColor}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Traços de Personalidade:</strong> {character.personalityTraits.join(', ')}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Habilidades:</strong> {character.skills.join(', ')}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Postura:</strong> {character.posture}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Condição de Saúde:</strong> {character.healthCondition}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Valor:</strong> {character.values.join(', ')}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Medo:</strong> {character.fears.join(', ')}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Motivação:</strong> {character.motivations.join(', ')}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Status Financeiro:</strong> {character.financialStatus}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1"><strong>Cultura:</strong> {character.culture}</Typography>
            </ListItem>
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default CharacterGenerator;