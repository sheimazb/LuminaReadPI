import React from "react";
import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  Divider,
  Image,
  Select,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
export interface Item {
  img: string | undefined;
  id: number;
  title: string;
  category: string;
  price: number;
}
const ConfirmPurchase: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState("Visa");
  const [items, setItems] = useState<Item[]>([]);
  const toast = useToast();
  const id= localStorage.getItem('id');


  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
        const parsedItems: Item[] = JSON.parse(storedItems);
        const itemsWithParsedPrice = parsedItems.map((item) => ({
            ...item,
            price: parseFloat(item.price.toString()), // Parse the price to a number
        }));
        console.log("Items:", parsedItems); // Log items here
        setItems(itemsWithParsedPrice);
    }
}, []);
const totalPrice = items.reduce((acc, item) => {
  const price =
      typeof item.price === "number"
          ? item.price
          : parseFloat(item.price as string);
  if (!isNaN(price)) {
      return acc + Number(price);
  }
  return acc;
}, 0);

const order = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_id: id,
              packs_ids: items.map(item => item.id), // Envoyer tous les IDs des packs dans le panier
          }),
      });

      if (!response.ok) {
          throw new Error('Failed to create order');
      }

      const orderData = await response.json();
      console.log('Order created successfully:', orderData);
      toast({
          title: "Order created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      // Effacer le panier après la commande
      localStorage.removeItem("cart");
      setItems([]);
      await addNotification();

  } catch (error:any) {
      console.error('Error creating order:', error);
      toast({
          title: "Error creating order",
          status: "error",
          duration: 3000,
          isClosable: true,
      });
  }
};

const addNotification = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/add-notification/' + id, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              content: "Votre commande a été passée avec succès.",
              seen: false,
          }),
      });

      if (!response.ok) {
          throw new Error('Failed to add notification');
      }

      const responseData = await response.json();
      console.log('Notification added successfully:', responseData);
  } catch (error:any) {
      console.error('Error adding notification:', error);
      toast({
          title: "Error adding notification",
          status: "error",
          duration: 3000,
          isClosable: true,
      });
  }
};

  return (
    <Flex justifyContent="center" alignItems="center" height="100%" >
      <Box className="window" display="flex" marginTop="7rem">
        <Box
          className="order-info"
          width="50%"
          paddingLeft="25px"
          paddingRight="25px"
          boxSizing="border-box"
          background="white" 
          color="black"
        >
          <Box className="order-info-content">
            <Text
              fontSize="xl"
              fontWeight="bold"
              marginBottom="0"
              textAlign="center"
              marginTop={5}
            >
              Order Summary
            </Text>
            <Divider />
            <Box marginTop="4">
              <table className="order-table">
              {items.map((item) => (

                <tbody>
                  <tr>
                    <td>
                      <Image
                      src={item.img}
                        className="full-width"
                        height="auto"
                        maxHeight="100px" 
                        marginRight={4}
                      />
                    </td>
                    <td>
                      <Text className="thin">{item.title}</Text>
                      <Text>{item.category}</Text>
                      
                    </td>
                    <td>
                      <div className="price"> {item.price.toFixed(2)}{" "}dt</div>
                    </td>
                  </tr>
                </tbody>
              ))}
              </table>
              <Divider />
            </Box>
            <Divider />
            <Box className="total">
              <Box float="left">
                <Text className="thin dense" marginTop={7}>VAT 15%</Text>
                <Text className="thin dense">Delivery</Text>
                <Text fontWeight="bold">TOTAL</Text>
              </Box>
              <Box float="right" textAlign="right">
                <Text className="thin dense">{totalPrice.toFixed(2)} dt</Text>
                <Text className="thin dense">0.00dt</Text>
                <Text fontWeight="bold">{totalPrice.toFixed(2)} dt</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="credit-info"
          background="#4488dd"
          height="100%"
          width="50%"
          color="#eee"
          justifyContent="center"
          alignItems="center"
          fontSize="14px"
          display="flex"
          flexDirection="column"
          boxSizing="border-box"
          paddingLeft="25px"
          paddingRight="25px"
          borderTopRightRadius="30px"
          borderBottomRightRadius="30px"
          position="relative"
        >
          <Box marginTop="25px" marginBottom="15px">
            <Text>Please select your card:</Text>
            <Select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
            >
              <option value="Visa">Visa</option>
              <option value="Master Card">Master Card</option>
              <option value="American Express">American Express</option>
            </Select>
          </Box>
          <Image
            src={
              selectedCard === "Visa"
                ? "https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png"
                : selectedCard === "Master Card"
                ? "https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png"
                : "https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png"
            }
            height="80px"
            className="credit-card-image"
          />
          <Box marginTop="5px" marginBottom="5px">
            <Text>Phone Number</Text>
            <Input className="input-field" />
          </Box>
          <Box marginTop="5px" marginBottom="5px">
            <Text>Email</Text>
            <Input className="input-field" />
          </Box>
          <Flex marginTop="5px" marginBottom="5px">
            <Box marginRight="4">
              <Text>Nom</Text>
              <Input className="input-field" />
            </Box>
            <Box>
              <Text>Prenom</Text>
              <Input className="input-field" />
            </Box>
          </Flex>
          <Button className="pay-btn"  marginTop="15px" marginBottom="15px">Confirm</Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ConfirmPurchase;
