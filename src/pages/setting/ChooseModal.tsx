import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Stack,
  Button as ChakraButton,
  Flex,
  Spacer,
  Divider,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  HStack,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import styled from "styled-components";
import supabase from "../../api/supabaseClient";
import Cookies from "js-cookie";

const TagButton = styled(ChakraButton)`
  width: 100%;
  justify-content: flex-start;
  align-items: center;

  i {
    font-size: 1.25rem;
    color: "#718096";
  }
`;

const FooterButton = styled(ChakraButton)`
  margin: 0 0.25rem;
  i {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;

const Container = styled.div`
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const ChooseModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const router = useRouter();
  const toast = useToast();
  const [shownTags, setShownTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data: routes, error } = await supabase.from("routes").select("*");

      console.log(routes);

      if (error) {
        console.error("Error fetching routes:", error);
      } else {
        const hiddenRoutes = Cookies.get("hiddenRoutes");
        const hiddenRouteList = hiddenRoutes ? JSON.parse(hiddenRoutes) : [];
        const shownRoutes = routes
          .map((route) => route.route_no)
          .filter((route_no) => !hiddenRouteList.includes(route_no));
        const hiddenRoutesFromDB = routes
          .map((route) => route.route_no)
          .filter((route_no) => hiddenRouteList.includes(route_no));

        setShownTags(shownRoutes);
        setHiddenTags(hiddenRoutesFromDB);
      }
    };

    fetchRoutes();
  }, []);

  const handleTagClick = (id: string, shown: boolean) => {
    if (shown) {
      setShownTags(shownTags.filter((tag) => tag !== id));
      setHiddenTags([...hiddenTags, id]);
    } else {
      setHiddenTags(hiddenTags.filter((tag) => tag !== id));
      setShownTags([...shownTags, id]);
    }
  };

  const handleSave = () => {
    try {
      Cookies.set("hiddenRoutes", JSON.stringify(hiddenTags));
      toast({
        title: "성공적으로 저장되었습니다.",
        status: "success",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "잠시 후 다시 시도해주세요.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>버스 목록 편집</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {shownTags.length === 0 ? (
            <Center>
              <Text color="gray" fontSize="small">
                모두 숨겼어요 🙈
              </Text>
            </Center>
          ) : (
            <Wrap spacing={4}>
              {shownTags.map((id) => (
                <WrapItem key={id}>
                  <Tag
                    size="lg"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                    onClick={() => handleTagClick(id, true)}
                  >
                    <TagLabel>{id}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}

          <Center height="50px">
            <Divider />
          </Center>

          <Text fontSize="md" as="b">
            제외된 버스 노선
          </Text>
          <Center height="20px"></Center>
          {hiddenTags.length === 0 ? (
            <Center>
              <Text color="gray" fontSize="small">
                태그를 눌러 버스를 숨길 수 있어요.
              </Text>
            </Center>
          ) : (
            <Stack spacing={4}>
              {hiddenTags.map((id) => (
                <WrapItem key={id}>
                  <TagButton
                    height={50}
                    size="md"
                    variant="solid"
                    colorScheme="gray"
                    onClick={() => handleTagClick(id, false)}
                  >
                    <Flex width="100%" alignItems="center">
                      <Text>{id} 번</Text>
                      <Spacer />
                      <i className="ri-add-line"></i>
                    </Flex>
                  </TagButton>
                </WrapItem>
              ))}
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          <FooterButton onClick={onClose}>
            <i className="ri-close-line"></i>취소
          </FooterButton>
          <FooterButton onClick={handleSave} bg="#008aff" color="white">
            <i className="ri-check-line"></i>저장
          </FooterButton>
        </ModalFooter>
      </ModalContent>
    </Container>
  );
};

export default ChooseModal;
