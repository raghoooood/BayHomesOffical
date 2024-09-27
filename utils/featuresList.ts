// Features list
import { MdSecurity, MdFitnessCenter, MdPool, MdFireExtinguisher, MdOutlineSportsTennis, MdSportsTennis, MdSportsCricket, MdArrowBack, MdArrowForward, MdLocationCity } from 'react-icons/md';
import { FaParking, FaSwimmingPool, FaBasketballBall, FaBath, FaChild } from 'react-icons/fa';
import { GiBarbecue, GiElevator, GiGymBag, GiSteam, GiGate } from 'react-icons/gi';
import { BsPersonBoundingBox, BsShop } from 'react-icons/bs';
import { RiCommunityLine } from 'react-icons/ri';
import { TbBeach } from "react-icons/tb";
import { IoMdFootball } from 'react-icons/io';
import { GrVmMaintenance } from 'react-icons/gr';


export const features = [
    { label: 'Security', icon: MdSecurity },
    { label: 'Maintenance', icon: GrVmMaintenance },
    { label: 'Barbecue', icon: GiBarbecue },
    { label: 'Basketball', icon: FaBasketballBall },
    { label: 'Parking', icon: FaParking },
    { label: 'CCTV', icon: GrVmMaintenance },
    { label: 'Fire Alarm', icon: MdFireExtinguisher },
    { label: 'Fitness', icon: MdFitnessCenter },
    { label: 'Gated', icon: GiGate },
    { label: 'Gym', icon: MdFitnessCenter },
    { label: 'Gymnasium', icon: GiGymBag },
    { label: 'Elevators', icon: GiElevator },
    { label: 'Jacuzzi', icon: FaBath },
    { label: 'Kids Pool', icon: FaSwimmingPool },
    { label: 'City Views', icon: MdLocationCity },
    { label: 'Sea Views', icon: TbBeach },
    { label: 'Play Area', icon: MdSportsCricket },
    { label: 'Children’s Area', icon: FaChild },
    { label: 'Pool Area', icon: MdPool },
    { label: 'Private Pool', icon: FaSwimmingPool },
    { label: 'Retail', icon: BsShop },
    { label: 'Sauna', icon: FaBath },
    { label: 'Squash', icon: MdSportsTennis },
    { label: 'Steam Room', icon: GiSteam },
    { label: 'Swimming', icon: FaSwimmingPool },
    { label: 'Community Pool', icon: RiCommunityLine },
    { label: 'Tennis', icon: MdOutlineSportsTennis },
    { label: 'Lobby', icon: BsPersonBoundingBox },
    { label: 'Football Pitch', icon: IoMdFootball },
];
