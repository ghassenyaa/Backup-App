import amazon from "../assets/icons/amazon.jpg";
import dropBox from "../assets/icons/dropBox.png";
import googleDrive from "../assets/icons/Google_Drive.png";
import Azure from "../assets/icons/Azuree.png";
import ServeurDistant from "../assets/icons/serveurD.png";
import serveurLocal from "../assets/icons/serveurLocal.jpg";

export default {
  backup_List: [
    {
      id: "amazon",
      name: "Amazon s3",
      icon: amazon,
    },
    {
      id: "dropbox",
      name: "DropBox",
      icon: dropBox,
    },
    {
      id: "drive",
      name: "Google Drive",
      icon: googleDrive,
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      icon: Azure,
    },
    {
      id: "distant",
      name: "Serveur Distant",
      icon: ServeurDistant,
    },
    {
      id: "local",
      name: "Serveur Local",
      icon: serveurLocal,
    },
  ],
};
