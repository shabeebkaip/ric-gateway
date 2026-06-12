import { getContactInfo } from "@/lib/getContactInfo";
import { FooterClient } from "./FooterClient";

export const Footer = async () => {
  const contactCards = await getContactInfo();
  return <FooterClient contactCards={contactCards} />;
};
