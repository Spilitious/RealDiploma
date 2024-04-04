import { useContext } from 'react';
// import { WorkflowContext } from '@/utils';
import { Flex, Switch, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Toggle = () => {
   // const { toggleColorMode, colorMode } = useContext(WorkflowContext);

  return (
    <Flex align="center">
      <IconButton
        variant="ghost"
        aria-label="Mode clair"
        icon={<SunIcon />}
        // onClick={toggleColorMode}
        colorScheme={colorMode === 'light' ? 'orange' : 'gray'}
        />
        <Switch 
        isChecked={colorMode === 'dark'} 
        // onChange={toggleColorMode}
        mx={2}
        />
        <IconButton
        variant="ghost"
        aria-label="Mode sombre"
        icon={<MoonIcon />}
       // onClick={toggleColorMode}
        colorScheme={colorMode === 'dark' ? 'blue' : 'gray'}
        />
    </Flex>
  )
}

export default Toggle