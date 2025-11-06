import HomeHeader from "@/components/navigation/HomeHeader";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  );
};

export default BrowseLayout;
