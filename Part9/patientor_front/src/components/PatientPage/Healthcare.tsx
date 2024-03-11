interface HelathcareDescriptionProps{
  description: string
}

const Helathcare = ({ description }: HelathcareDescriptionProps) => {
  return (
    <div>{ description }</div>
  );
};

export default Helathcare;