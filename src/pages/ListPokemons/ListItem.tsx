import { NamedAPIResource } from "pokenode-ts";

interface Props {
  item: NamedAPIResource;
}
const ListItem = ({ item }: Props) => {
  const captalisedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
  return (
    <div className="p-4 text-lg  border border-white rounded-3xl text-center">
      {captalisedName}
    </div>
  );
};
export default ListItem;
