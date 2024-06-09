import { Box } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Box position="relative" width="300px" height="300px">
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="50%"
          animation="spin 5s linear infinite"
          margin={'auto'}
        >
         
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="40%"
            height="40%"
            borderRadius="50%"
            border="8px dotted #F33A6A"
          />
        </Box>
        <style jsx global>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;