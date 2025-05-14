import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/config';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('limit')) || 10;

  try {
    const applicationsRef = collection(db, 'applications');
    console.log('Collection reference created:', applicationsRef);
    
    const q = query(applicationsRef, orderBy('submissionDate', 'desc'));
    console.log('Query created:', q);
    
    const querySnapshot = await getDocs(q);
    console.log('Query snapshot retrieved. Number of documents:', querySnapshot.size);
    
    const total = querySnapshot.size;
    
    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Get paginated documents
    const applications = querySnapshot.docs
      .slice(startIndex, endIndex)
      .map(doc => {
        const data = doc.data();
        console.log('Processing document:', {
          id: doc.id,
          clientId: data.clientId,
          clientName: data.clientName,
          submissionDate: data.submissionDate
        });
        return {
          id: doc.id,
          ...data
        };
      });

    console.log('Returning applications:', applications);

    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
} 