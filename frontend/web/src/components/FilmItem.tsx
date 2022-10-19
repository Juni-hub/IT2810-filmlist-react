import {Modal} from "antd";
import { CollectionCreateFilmProps } from "../utils/Interface";

export const ShowFilmItem: React.FC<CollectionCreateFilmProps> = ({
  film,
  open,
  onCancel,
}) => {

  return(
    <Modal title={film.title} cancelText="Close" open={open} onCancel={onCancel} footer={null}>
      <p>Year: {film.year? film.year: ""} </p>
      <p>Cast: {film.cast? film.cast.map((el) => el + ", "): ""}</p>
      <p>Genres: {film.genres? film.genres.map((el) => el + ", "): ""}</p>
    </Modal>
  );
}