'use client';

import { ReactNode } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { useDeleteProgram } from '../api/useDeleteProgram';
import { ProgramWithId } from '../types/Program';

type Props = {
  programs: ProgramWithId[];
  onEdit: (program: ProgramWithId) => void;
};

function ProgramList({ programs, onEdit }: Props): ReactNode {
  const deleteMutation = useDeleteProgram();

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {programs.map(program => (
        <Card
          key={program._id.toString()}
          className='flex flex-col'
        >
          <CardHeader className='flex-row items-center justify-between space-y-0'>
            <div className='flex items-center space-x-2'>
              <h3 className='font-semibold'>{program.title}</h3>
            </div>
            <div className='flex space-x-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => onEdit(program)}
              >
                <FaEdit className='size-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleDelete(program._id.toString())}
                disabled={deleteMutation.isPending}
              >
                <FaTrash className='size-4' />
              </Button>
            </div>
          </CardHeader>

          <CardContent className='flex-grow'>
            <p className='text-sm text-muted-foreground'>
              {program.description}
            </p>
            <div className='mt-4 space-y-2'>
              <div className='flex flex-wrap gap-2'>
                <Badge variant='outline'>{program.tags.location}</Badge>
                <Badge variant='outline'>
                  Energy: {program.tags.energyLevel}/10
                </Badge>
                <Badge variant='outline'>{program.tags.duration}</Badge>
                <Badge variant='outline'>{program.tags.challenge}</Badge>
                <Badge variant='outline'>{program.tags.space}</Badge>
                {program.tags.type.map((activityType, index) => (
                  <Badge
                    key={index}
                    variant='outline'
                  >
                    {activityType}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex justify-between'>
            <Button
              variant='outline'
              asChild
            >
              <a
                href={program.canvaLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                View Canvas
              </a>
            </Button>
            <Button
              variant='outline'
              asChild
            >
              <a
                href={program.pdfLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                View PDF
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ProgramList;
