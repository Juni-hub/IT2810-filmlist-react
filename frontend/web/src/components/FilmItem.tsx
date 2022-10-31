import { Modal } from "antd";
import { CollectionCreateFilmProps } from "../utils/Interface";

export const ShowFilmItem: React.FC<CollectionCreateFilmProps> = ({
  film,
  open,
  onCancel,
}) => {

  return(
    <Modal 
    title={"Chosen film"} 
    cancelText="Close" 
    open={open} 
    onCancel={onCancel} 
    footer={null}
    key={film.title}
    >
      <p style={{fontSize: 20}}> {film.title? film.title: ""} </p>
      <p style={{fontSize: 15}}>Year: {film.year? film.year: ""} </p>
      <p style={{fontSize: 15}}>Cast: {(film.cast.length === 0)? "No cast is registered for this film": film.cast.map((el) => el + ", ")}</p>
      <p style={{fontSize: 15}}>Genres: {(film.genres.length === 0)? "No genre is registered for this film" : film.genres.map((el) => el + ", ")}</p>
    </Modal>
  );
}