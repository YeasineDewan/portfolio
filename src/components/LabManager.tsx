import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Button, 
  Progress, 
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Input
} from '@heroui/react';
import { 
  PlayIcon, 
  SquareIcon, 
  SettingsIcon, 
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  CopyIcon
} from 'lucide-react';

interface Lab {
  id: string;
  name: string;
  status: 'not-started' | 'running' | 'completed' | 'paused';
  progress: number;
  difficulty: string;
  category: string;
  setupCommand: string;
  notes: string;
  startTime?: Date;
  completionTime?: Date;
}

interface LabManagerProps {
  labs: Lab[];
  onLabStatusChange: (labId: string, status: Lab['status']) => void;
  onLabProgressUpdate: (labId: string, progress: number) => void;
  onLabNotesUpdate: (labId: string, notes: string) => void;
}

const LabManager: React.FC<LabManagerProps> = ({
  labs,
  onLabStatusChange,
  onLabProgressUpdate,
  onLabNotesUpdate
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const getStatusColor = (status: Lab['status']) => {
    switch (status) {
      case 'not-started': return 'default';
      case 'running': return 'primary';
      case 'completed': return 'success';
      case 'paused': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: Lab['status']) => {
    switch (status) {
      case 'not-started': return <ClockIcon size={16} />;
      case 'running': return <PlayIcon size={16} />;
      case 'completed': return <CheckCircleIcon size={16} />;
      case 'paused': return <AlertCircleIcon size={16} />;
      default: return <ClockIcon size={16} />;
    }
  };

  const handleLabAction = (lab: Lab, action: 'start' | 'stop' | 'complete' | 'reset') => {
    switch (action) {
      case 'start':
        onLabStatusChange(lab.id, 'running');
        break;
      case 'stop':
        onLabStatusChange(lab.id, 'paused');
        break;
      case 'complete':
        onLabStatusChange(lab.id, 'completed');
        onLabProgressUpdate(lab.id, 100);
        break;
      case 'reset':
        onLabStatusChange(lab.id, 'not-started');
        onLabProgressUpdate(lab.id, 0);
        break;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openLabDetails = (lab: Lab) => {
    setSelectedLab(lab);
    onOpen();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lab Progress Tracker</h2>
        <div className="flex gap-2">
          <Chip color="success" variant="flat">
            {labs.filter(lab => lab.status === 'completed').length} Completed
          </Chip>
          <Chip color="primary" variant="flat">
            {labs.filter(lab => lab.status === 'running').length} Active
          </Chip>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab) => (
          <Card key={lab.id} className="bg-content2 hover:bg-content3 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{lab.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <Chip color={getStatusColor(lab.status)} variant="flat" size="sm">
                      {getStatusIcon(lab.status)}
                      {lab.status.replace('-', ' ')}
                    </Chip>
                    <Chip color="primary" variant="bordered" size="sm">
                      {lab.difficulty}
                    </Chip>
                  </div>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => openLabDetails(lab)}
                >
                  <SettingsIcon size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-2">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{lab.progress}%</span>
                </div>
                <Progress 
                  value={lab.progress} 
                  color={lab.status === 'completed' ? 'success' : 'primary'}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {lab.status === 'not-started' && (
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    startContent={<PlayIcon size={14} />}
                    onPress={() => handleLabAction(lab, 'start')}
                  >
                    Start Lab
                  </Button>
                )}
                
                {lab.status === 'running' && (
                  <>
                                         <Button
                       size="sm"
                       color="warning"
                       variant="flat"
                       startContent={<SquareIcon size={14} />}
                       onPress={() => handleLabAction(lab, 'stop')}
                     >
                       Pause
                     </Button>
                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      startContent={<CheckCircleIcon size={14} />}
                      onPress={() => handleLabAction(lab, 'complete')}
                    >
                      Complete
                    </Button>
                  </>
                )}
                
                {lab.status === 'paused' && (
                  <>
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      startContent={<PlayIcon size={14} />}
                      onPress={() => handleLabAction(lab, 'start')}
                    >
                      Resume
                    </Button>
                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      startContent={<CheckCircleIcon size={14} />}
                      onPress={() => handleLabAction(lab, 'complete')}
                    >
                      Complete
                    </Button>
                  </>
                )}
                
                {lab.status === 'completed' && (
                  <Button
                    size="sm"
                    color="default"
                    variant="flat"
                    startContent={<BookOpenIcon size={14} />}
                    onPress={() => openLabDetails(lab)}
                  >
                    Review
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Lab Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold">{selectedLab?.name}</h2>
          </ModalHeader>
          <ModalBody>
            {selectedLab && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Lab Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Chip color={getStatusColor(selectedLab.status)} variant="flat" size="sm">
                          {selectedLab.status.replace('-', ' ')}
                        </Chip>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span>{selectedLab.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{selectedLab.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Progress:</span>
                        <span>{selectedLab.progress}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Progress Control</h3>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        label="Progress (%)"
                        value={selectedLab.progress.toString()}
                        onChange={(e) => onLabProgressUpdate(selectedLab.id, parseInt(e.target.value) || 0)}
                        min={0}
                        max={100}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => handleLabAction(selectedLab, 'start')}
                        >
                          Start
                        </Button>
                        <Button
                          size="sm"
                          color="success"
                          variant="flat"
                          onPress={() => handleLabAction(selectedLab, 'complete')}
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          color="default"
                          variant="flat"
                          onPress={() => handleLabAction(selectedLab, 'reset')}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Setup Command</h3>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-content1 px-3 py-2 rounded text-sm">
                      {selectedLab.setupCommand}
                    </code>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onPress={() => copyToClipboard(selectedLab.setupCommand)}
                    >
                      <CopyIcon size={16} />
                    </Button>
                  </div>
                  {copiedCommand === selectedLab.setupCommand && (
                    <p className="text-success text-sm mt-1">Command copied to clipboard!</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <Textarea
                    placeholder="Add your notes, findings, or observations here..."
                    value={selectedLab.notes}
                    onChange={(e) => onLabNotesUpdate(selectedLab.id, e.target.value)}
                    minRows={4}
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LabManager; 