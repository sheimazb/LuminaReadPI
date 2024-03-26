import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Novella {
    id: number;
    title: string;
    description: string;
    content: string;
}

const NovellaContent: React.FC = () => {
    const [novellas, setNovellas] = useState<Novella[]>([]);

    useEffect(() => {
        const loadNovellas = async () => {
            try {
                // Extracting the last ID from the URL
                const urlParts = window.location.pathname.split('/');
                const lastId = urlParts[urlParts.length - 2]; // Assuming the ID is the second last part of the URL
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/novellas/${lastId}`
                );
                setNovellas([response.data]); // Wrap response.data in an array since setNovellas expects an array
            } catch (error) {
                console.error("Erreur lors du chargement des novellas:", error);
            }
        };

        loadNovellas();
    }, []);
console.log('jj',novellas);
    return (
        <Box>
            {novellas.map((novella: Novella, index: number) => (
                <Flex direction={'column'} key={index}>
                    <Text>Title: {novella.title}</Text>
                    <Text>Description: {novella.description}</Text>
                    <Text>Content: {novella.content}</Text>
                </Flex>
            ))}
        </Box>
    );
}

export default NovellaContent;
