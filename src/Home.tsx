import Board, { IBoardProps } from "./Boards/index.tsx";
export interface IHomeProps {
  boards: Array<IBoardProps>;
}

const Home = () => {
  const boards: Array<IBoardProps> = [
    {
      boardName: "Eating Healthy 🍽️",
      boardId: "1",
      numberOfPeople: 3,
      description: "Discover the joy of nutritious meals!",
    },
    {
      boardName: "Reading 📕",
      boardId: "2",
      numberOfPeople: 4,
      description: "Dive into the world of books and knowledge.",
    },
    {
      boardName: "Swimming 🏊",
      boardId: "3",
      numberOfPeople: 5,
      description: "Stay fit and enjoy the water!",
    },
    {
      boardName: "Activity 🚶",
      boardId: "1",
      numberOfPeople: 7,
      description: "Engage in exciting physical activities.",
    },
    {
      boardName: "Yoga 🧘",
      boardId: "1",
      numberOfPeople: 4,
      description: "Find peace and balance through yoga.",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {boards && boards.map((board) => <Board {...board} />)}
    </div>
  );
};

export default Home;
